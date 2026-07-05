import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock generated pages
    const pages = [
      {
        id: '1',
        slug: 'almaty-remont-trub',
        title: 'Ремонт труб в Алматы - быстро и надежно',
        url: 'https://kz-service.pro/almaty-remont-trub/',
        status: 'published',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '2',
        slug: 'shymkent-remont-trub',
        title: 'Ремонт труб в Шымкенте - 24/7',
        url: 'https://kz-service.pro/shymkent-remont-trub/',
        status: 'published',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        slug: 'karaganda-santehnik',
        title: 'Сантехнические услуги в Караганде',
        url: 'https://kz-service.pro/karaganda-santehnik/',
        status: 'draft',
        created_at: new Date().toISOString(),
      },
      {
        id: '4',
        slug: 'aktobe-santehnik',
        title: 'Сантехнические услуги в Актобе',
        url: 'https://kz-service.pro/aktobe-santehnik/',
        status: 'draft',
        created_at: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      pages,
      total: pages.length,
      published: pages.filter((p) => p.status === 'published').length,
      draft: pages.filter((p) => p.status === 'draft').length,
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}
