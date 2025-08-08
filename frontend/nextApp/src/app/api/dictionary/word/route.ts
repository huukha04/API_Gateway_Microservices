

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { libraryId, word, types, pronunciation } = await req.json();
    const res = await fetch(`${process.env.API_GATEWAY_URL}/dictionary/word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ libraryId, word, types, pronunciation}),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.message || 'Registration error' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ message: 'Client error' }, { status: 500 });
  }
}


