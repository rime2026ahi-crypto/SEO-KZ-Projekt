'use client';

import Link from 'next/link';
import { Rocket, BarChart3, Building2, Palette, Globe, CheckCircle2, Upload, Lightbulb } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать в pSEO Platform</h1>
      <p className="text-gray-600 mb-8">Выбери что хочешь делать:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Generate Card */}
        <Link href="/admin/generate">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-600">
            <Rocket className="w-10 h-10 text-blue-600 mb-2" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Генерация</h2>
            <p className="text-gray-600 text-sm">
              Создай новые страницы. Выбери режим 1 или режим 2
            </p>
          </div>
        </Link>

        {/* Monitor Card */}
        <Link href="/admin/monitor">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-600">
            <BarChart3 className="w-10 h-10 text-green-600 mb-2" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Мониторинг</h2>
            <p className="text-gray-600 text-sm">
              Смотри прогресс генерации в реальном времени
            </p>
          </div>
        </Link>

        {/* Niches Card */}
        <Link href="/admin/niches">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-600">
            <Building2 className="w-10 h-10 text-purple-600 mb-2" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ниши</h2>
            <p className="text-gray-600 text-sm">
              Управляй нишами (сантехник, электрик и т.д.)
            </p>
          </div>
        </Link>

        {/* Templates Card */}
        <Link href="/admin/templates">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-pink-600">
            <Palette className="w-10 h-10 text-pink-600 mb-2" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Шаблоны</h2>
            <p className="text-gray-600 text-sm">
              Загружай и управляй HTML шаблонами
            </p>
          </div>
        </Link>

        {/* Locations Card */}
        <Link href="/admin/locations">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-cyan-600">
            <Globe className="w-10 h-10 text-cyan-600 mb-2" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Города</h2>
            <p className="text-gray-600 text-sm">
              Загружай список городов и локальные факты
            </p>
          </div>
        </Link>

        {/* QA Card */}
        <Link href="/admin/qa">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-yellow-600">
            <CheckCircle2 className="w-10 h-10 text-yellow-600 mb-2" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">QA Проверка</h2>
            <p className="text-gray-600 text-sm">
              Проверяй качество страниц вручную
            </p>
          </div>
        </Link>

        {/* Publish Card */}
        <Link href="/admin/publish">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-orange-600">
            <Upload className="w-10 h-10 text-orange-600 mb-2" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Публикация</h2>
            <p className="text-gray-600 text-sm">
              Публикуй страницы волнами с контролем
            </p>
          </div>
        </Link>
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-blue-900" />
          <h3 className="text-lg font-bold text-blue-900">Как начать?</h3>
        </div>
        <ol className="text-blue-800 space-y-2 text-sm">
          <li>1. Перейди в "Ниши" и создай нишу (например, сантехник)</li>
          <li>2. Перейди в "Шаблоны" и загрузи HTML шаблон</li>
          <li>3. Перейди в "Города" и загрузи список городов (CSV)</li>
          <li>4. Перейди в "Генерация" и запусти создание страниц</li>
          <li>5. Смотри прогресс в "Мониторинг"</li>
          <li>6. Опубликуй в "Публикация"</li>
        </ol>
      </div>
    </div>
  );
}
