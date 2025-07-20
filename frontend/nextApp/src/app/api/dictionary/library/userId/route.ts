import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('userId');
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const res = await fetch(`${process.env.API_GATEWAY_URL}/dictionary/library/userId/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed to fetch libraries' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Error fetching libraries:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}