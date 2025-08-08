import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const libraryId = req.headers.get('libraryId');
    if (!libraryId) {
      return NextResponse.json({ message: '' }, { status: 400 });
    }

    const res = await fetch(`${process.env.API_GATEWAY_URL}/dictionary/word/libraryId/${libraryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
            console.error('Failed to fetch libraries:', res.statusText);
      return NextResponse.json({ message: 'Failed to fetch libraries' }, { status: 500 });

    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Error fetching libraries:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}