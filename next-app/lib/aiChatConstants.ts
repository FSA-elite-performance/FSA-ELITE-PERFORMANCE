/** Maximum number of conversation turns (user + assistant) accepted by the AI chat API. */
export const AI_CHAT_MAX_MESSAGES = 40;

/** Maximum characters allowed per individual message sent to the AI chat API. */
export const AI_CHAT_MAX_MSG_CHARS = 2000;

/** A single chat message exchanged between the user and the AI assistant. */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
