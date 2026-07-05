import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, region } = body;

    if (!name || !region) {
      return NextResponse.json(
        { error: 'Name and region are required' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    // TODO: Save to PostgreSQL
    // For now just return success
    return NextResponse.json({
      success: true,
      location: {
        id: Date.now().toString(),
        name,
        slug,
        region,
      },
      message: '✅ Город добавлен в БД!',
    });
  } catch (error) {
    console.error('Error adding location:', error);
    return NextResponse.json(
      { error: 'Failed to add location' },
      { status: 500 }
    );
  }
}
