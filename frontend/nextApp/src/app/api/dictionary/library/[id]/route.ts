import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const { title, language, isStarred, isPublic } = await req.json();

  if (!title || !language) {
    return NextResponse.json({ message: 'Title and language are required' }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.API_GATEWAY_URL}/dictionary/library/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, language, isStarred, isPublic }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.message || 'Update error' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Update successful' }, { status: 200 });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
