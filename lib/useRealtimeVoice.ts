import { useCallback, useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type VoiceStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'listening'
  | 'speaking'
  | 'error';

export type VoiceTranscript = {
  role: 'user' | 'assistant';
  text: string;
};

interface UseRealtimeVoiceOptions {
  personaInstructions: string;
  onTranscript?: (transcript: VoiceTranscript) => void;
  onStatusChange?: (status: VoiceStatus) => void;
}

interface UseRealtimeVoiceReturn {
  status: VoiceStatus;
  error: string;
  transcripts: VoiceTranscript[];
  start: () => Promise<void>;
  stop: () => void;
}

// ─── WebSocket event types ────────────────────────────────────────────────────

type RealtimeEvent = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const REALTIME_BASE = 'wss://api.openai.com/v1/realtime';
const REALTIME_MODEL = 'gpt-4o-realtime-preview-2025-06-03';

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRealtimeVoice({
  personaInstructions,
  onTranscript,
  onStatusChange,
}: UseRealtimeVoiceOptions): UseRealtimeVoiceReturn {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [error, setError] = useState('');
  const [transcripts, setTranscripts] = useState<VoiceTranscript[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const playbackQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const instructionsRef = useRef(personaInstructions);

  // Keep instructions ref current without triggering reconnect.
  useEffect(() => {
    instructionsRef.current = personaInstructions;
  }, [personaInstructions]);

  const updateStatus = useCallback(
    (next: VoiceStatus) => {
      setStatus(next);
      onStatusChange?.(next);
    },
    [onStatusChange]
  );

  // ── Playback ──

  const playNextChunk = useCallback(async () => {
    if (isPlayingRef.current) return;
    const chunk = playbackQueueRef.current.shift();
    if (!chunk) return;

    const ctx = audioContextRef.current;
    if (!ctx) return;

    isPlayingRef.current = true;
    try {
      // OpenAI sends raw PCM16 24kHz mono. Decode manually.
      const pcm16 = new Int16Array(chunk);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768;
      }

      const buffer = ctx.createBuffer(1, float32.length, 24000);
      buffer.copyToChannel(float32, 0);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => {
        isPlayingRef.current = false;
        playNextChunk();
      };
      source.start();
    } catch {
      isPlayingRef.current = false;
      playNextChunk();
    }
  }, []);

  // ── Microphone → WebSocket ──

  const startMicrophone = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 24000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
    mediaStreamRef.current = stream;

    const ctx = audioContextRef.current;
    if (!ctx) return;

    const source = ctx.createMediaStreamSource(stream);
    // ScriptProcessor is deprecated but universally supported. AudioWorklet
    // requires a separate module file which complicates bundling — acceptable
    // trade-off for an initial voice-mode implementation.
    const processor = ctx.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    processor.onaudioprocess = (event) => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;

      const inputData = event.inputBuffer.getChannelData(0);

      // Resample from AudioContext sampleRate to 24000 Hz.
      const sampleRate = ctx.sampleRate;
      const targetRate = 24000;
      const ratio = sampleRate / targetRate;
      const outputLength = Math.floor(inputData.length / ratio);
      const pcm16 = new Int16Array(outputLength);

      for (let i = 0; i < outputLength; i++) {
        const srcIdx = Math.floor(i * ratio);
        const sample = Math.max(-1, Math.min(1, inputData[srcIdx]));
        pcm16[i] = sample < 0 ? sample * 32768 : sample * 32767;
      }

      const base64 = arrayBufferToBase64(pcm16.buffer);

      ws.send(
        JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: base64,
        })
      );
    };

    source.connect(processor);
    processor.connect(ctx.destination);
  }, []);

  // ── Start voice session ──

  const start = useCallback(async () => {
    if (status === 'connecting' || status === 'connected' || status === 'listening') {
      return;
    }

    setError('');
    setTranscripts([]);
    playbackQueueRef.current = [];
    isPlayingRef.current = false;
    updateStatus('connecting');

    try {
      // 1. Get ephemeral token from our API.
      const tokenRes = await fetch('/api/realtime-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaInstructions: instructionsRef.current,
        }),
      });

      const tokenData = (await tokenRes.json()) as {
        clientSecret?: string;
        error?: string;
      };

      if (!tokenRes.ok || !tokenData.clientSecret) {
        throw new Error(tokenData.error ?? 'Failed to get voice session token.');
      }

      // 2. Create AudioContext.
      const ctx = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = ctx;

      // 3. Connect WebSocket to OpenAI Realtime.
      const url = `${REALTIME_BASE}?model=${REALTIME_MODEL}`;
      const ws = new WebSocket(url, [
        'realtime',
        `openai-insecure-api-key.${tokenData.clientSecret}`,
        'openai-beta.realtime-v1',
      ]);
      wsRef.current = ws;

      ws.onopen = async () => {
        updateStatus('connected');
        try {
          await startMicrophone();
          updateStatus('listening');
        } catch (micError: unknown) {
          const msg =
            micError instanceof Error ? micError.message : 'Microphone access denied.';
          setError(msg);
          updateStatus('error');
          ws.close();
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string) as RealtimeEvent;

          switch (data.type) {
            case 'response.audio.delta': {
              // Incoming audio chunk (base64 PCM16).
              if (typeof data.delta === 'string') {
                const binary = base64ToArrayBuffer(data.delta);
                playbackQueueRef.current.push(binary);
                updateStatus('speaking');
                playNextChunk();
              }
              break;
            }

            case 'response.audio.done': {
              updateStatus('listening');
              break;
            }

            case 'conversation.item.input_audio_transcription.completed': {
              // User speech transcript.
              if (typeof data.transcript === 'string' && data.transcript.trim()) {
                const t: VoiceTranscript = { role: 'user', text: data.transcript.trim() };
                setTranscripts((prev) => [...prev, t]);
                onTranscript?.(t);
              }
              break;
            }

            case 'response.audio_transcript.done': {
              // Assistant speech transcript.
              if (typeof data.transcript === 'string' && data.transcript.trim()) {
                const t: VoiceTranscript = { role: 'assistant', text: data.transcript.trim() };
                setTranscripts((prev) => [...prev, t]);
                onTranscript?.(t);
              }
              break;
            }

            case 'error': {
              console.error('Realtime API error:', data);
              setError(data.error?.message ?? 'Voice session error.');
              break;
            }
          }
        } catch {
          // Non-JSON message, ignore.
        }
      };

      ws.onerror = () => {
        setError('Voice connection error.');
        updateStatus('error');
      };

      ws.onclose = () => {
        updateStatus('idle');
        cleanup();
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to start voice session.';
      setError(msg);
      updateStatus('error');
    }
  }, [status, updateStatus, startMicrophone, playNextChunk, onTranscript]);

  // ── Stop ──

  const cleanup = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    playbackQueueRef.current = [];
    isPlayingRef.current = false;
  }, []);

  const stop = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    cleanup();
    updateStatus('idle');
  }, [cleanup, updateStatus]);

  // ── Unmount cleanup ──

  useEffect(() => {
    return () => {
      wsRef.current?.close();
      cleanup();
    };
  }, [cleanup]);

  return { status, error, transcripts, start, stop };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
