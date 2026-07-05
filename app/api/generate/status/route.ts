import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const batchId = request.nextUrl.searchParams.get('batchId');

    if (!batchId) {
      return NextResponse.json({ error: 'batchId required' }, { status: 400 });
    }

    const progress = {
      batchId,
      status: 'generating',
      progress: 45,
      total: 100,
      completed: 45,
      failed: 2,
      unique: 42,
      duplicates: 1,
      estimatedTimeRemaining: 180,
      logs: [
        '✅ Started generation...',
        '📝 Processing cities...',
        '⚡ Generating pages...',
      ],
    };

    return NextResponse.json(progress);
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
