import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { domain, pageIds } = await request.json();

    // Валидация
    if (!domain || !domain.trim()) {
      return NextResponse.json(
        { error: 'Домен не может быть пустым' },
        { status: 400 }
      );
    }

    if (!pageIds || pageIds.length === 0) {
      return NextResponse.json(
        { error: 'Выбери хотя бы одну страницу' },
        { status: 400 }
      );
    }

    // Проверяем формат домена
    const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})+$/i;
    if (!domainRegex.test(domain)) {
      return NextResponse.json(
        { error: 'Неправильный формат домена. Пример: santehnik.kz' },
        { status: 400 }
      );
    }

    // ===== В РЕАЛЬНОЙ СИСТЕМЕ ЗДЕСЬ БЫ БЫЛ КОД К БД =====
    // Пока используем mock данные для демонстрации

    // РЕАЛЬНЫЙ КОД (когда подключишь БД):
    /*
    import { db } from '@/db';
    import { pages } from '@/db/schema';
    import { eq, inArray } from 'drizzle-orm';

    // Обновляем все выбранные страницы
    const updatedPages = await db
      .update(pages)
      .set({ domain_id: domain })
      .where(inArray(pages.id, pageIds))
      .returning();

    return NextResponse.json({
      success: true,
      message: `${updatedPages.length} страниц подвязаны к домену ${domain}`,
      attachedCount: updatedPages.length
    });
    */

    // ===== MOCK ОТВЕТ (демонстрация) =====
    console.log(`Подвязка ${pageIds.length} страниц к домену ${domain}`);

    // Логируем что произошло
    console.log('Обновлённые страницы:');
    pageIds.forEach((id: string) => {
      console.log(`  - страница ${id} → домен: ${domain}`);
    });

    // Возвращаем успешный ответ
    return NextResponse.json({
      success: true,
      message: `${pageIds.length} страниц успешно подвязаны к домену ${domain}`,
      attachedCount: pageIds.length,
      domain: domain,
      pageIds: pageIds
    });

  } catch (error) {
    console.error('Ошибка при подвязке домена:', error);
    return NextResponse.json(
      { error: 'Ошибка при подвязке домена' },
      { status: 500 }
    );
  }
}
