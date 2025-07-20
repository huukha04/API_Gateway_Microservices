import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const { libraryId, word, types, pronunciation } = await req.json();

  try {
    const res = await fetch(`${process.env.API_GATEWAY_URL}/dictionary/word/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ libraryId, word, types, pronunciation }),
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

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const res = await fetch(`${process.env.API_GATEWAY_URL}/dictionary/word/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Delete error' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Delete successful' }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
