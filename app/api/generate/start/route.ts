import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, niche_id, cities, services } = body;

    if (!niche_id || !cities?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate unique batch ID
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Calculate total pages
    const servicesArray = services && services.length > 0 ? services : ['main'];
    const totalPages = cities.length * servicesArray.length;

    console.log(`✅ Generation batch started: ${batchId}`);
    console.log(`📊 Total pages: ${totalPages}`);
    console.log(`🏙️ Cities: ${cities.join(', ')}`);
    console.log(`🔧 Services: ${servicesArray.join(', ')}`);

    return NextResponse.json({
      batchId,
      status: 'generating',
      totalPages,
      message: `✅ Генерация запущена! Batch ID: ${batchId}`,
      cities,
      services: servicesArray,
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
