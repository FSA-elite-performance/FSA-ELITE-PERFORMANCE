import { get } from '@vercel/edge-config';
import { NextResponse } from 'next/server';

export const config = {
  matcher: '/welcome',
};

export async function middleware() {
  if (!process.env.EDGE_CONFIG) {
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }

  try {
    const greeting = await get<string>('greeting');

    if (greeting === undefined) {
      return NextResponse.json({ error: 'Greeting not found.' }, { status: 404 });
    }

    if (typeof greeting !== 'string') {
      return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
    }

    const normalizedGreeting = greeting.trim();

    if (normalizedGreeting.length === 0) {
      return NextResponse.json({ error: 'Greeting not found.' }, { status: 404 });
    }

    return NextResponse.json({ greeting: normalizedGreeting });
  } catch (error: unknown) {
    console.error('Failed to read greeting from Edge Config:', error);

    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
  }
}
