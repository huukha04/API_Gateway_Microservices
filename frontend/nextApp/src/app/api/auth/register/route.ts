import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: 'Missing information' }, { status: 400 });
    }

    const res = await fetch(`${process.env.API_GATEWAY_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await res.json();

    if (!res.ok) {
    return NextResponse.json({ message: data.message || 'Registration error' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
    } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }

}
