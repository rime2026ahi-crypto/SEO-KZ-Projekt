import { NextRequest, NextResponse } from 'next/server';

interface GenerateRequest {
  niche_id: string;
  cities: string[];
  services: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { niche_id, cities, services } = body;

    if (!niche_id || !cities || cities.length === 0) {
      return NextResponse.json(
        { error: 'niche_id and cities are required' },
        { status: 400 }
      );
    }

    // Generate unique batch ID
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simulate page generation
    const generatedPages = cities.flatMap((city) =>
      services.map((service) => ({
        id: `page_${Date.now()}_${Math.random()}`,
        slug: `${city}-${service}`,
        title: `${service} в ${city} - профессиональные услуги`,
        url: `https://kz-service.pro/${city}-${service}/`,
        status: 'draft',
        created_at: new Date().toISOString(),
      }))
    );

    console.log(`📝 Generated ${generatedPages.length} pages for batch ${batchId}`);

    return NextResponse.json({
      success: true,
      batchId,
      totalPages: generatedPages.length,
      pages: generatedPages.slice(0, 5), // Return first 5 as sample
      message: `✅ Генерация запущена! Создано ${generatedPages.length} страниц`,
    });
  } catch (error) {
    console.error('❌ Generation error:', error);
    return NextResponse.json(
      { error: 'Generation failed', details: String(error) },
      { status: 500 }
    );
  }
}
