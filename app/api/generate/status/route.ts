import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const batchId = request.nextUrl.searchParams.get('batchId');

    if (!batchId) {
      return NextResponse.json({ error: 'batchId required' }, { status: 400 });
    }

    const progress = {
      batchId,
      status: 'running',
      total_pages: 100,
      completed_pages: 45,
      unique_pages: 42,
      percentage: 45,
      recent_pages: [],
      logs: [],
    };

    return NextResponse.json(progress);
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
