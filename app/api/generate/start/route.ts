import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const batchId = uuidv4();

    const { mode, niche_id, cities, services } = body;

    if (!mode || !niche_id || !cities?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('✅ Generation batch started:', { batchId, niche_id, cities: cities.length });

    return NextResponse.json({
      batchId,
      status: 'started',
      message: `Generation batch ${batchId} started successfully`,
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
