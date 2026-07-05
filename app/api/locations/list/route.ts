import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return NextResponse.json(
        { error: 'DATABASE_URL not configured' },
        { status: 500 }
      );
    }

    // For now return mock data - in production would query PostgreSQL
    const locations = [
      { id: '1', name: 'Алматы', slug: 'almaty', region: 'Алматинская область' },
      { id: '2', name: 'Нур-Султан', slug: 'nur-sultan', region: 'Акмолинская область' },
      { id: '3', name: 'Шымкент', slug: 'shymkent', region: 'Южно-Казахстанская область' },
      { id: '4', name: 'Караганда', slug: 'karaganda', region: 'Карагандинская область' },
      { id: '5', name: 'Актобе', slug: 'aktobe', region: 'Западно-Казахстанская область' },
    ];

    return NextResponse.json({ locations, total: locations.length });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
