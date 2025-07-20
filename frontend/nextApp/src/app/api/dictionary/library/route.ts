import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, language, user } = await req.json();
    if (!title || !language) {
      return NextResponse.json({ message: 'Title and language are required' }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    const res = await fetch(`${process.env.API_GATEWAY_URL}/dictionary/library`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, language, user: user }),
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
