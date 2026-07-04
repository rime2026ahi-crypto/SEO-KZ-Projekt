'use client';

import { Upload, Lightbulb, CheckCircle2, Clock, AlertCircle, BarChart3, Calendar } from 'lucide-react';

export default function PublishPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Upload className="w-8 h-8 text-orange-600" />
        <h1 className="text-3xl font-bold text-gray-900">Публикация Волнами</h1>
      </div>

      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-900 font-bold mb-2 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Готово к публикации: 995 страниц
        </p>
        <p className="text-blue-800 text-sm">
          Волновая публикация помогает избежать проблем с индексацией. Публикуем по 100 страниц каждые 3 дня.
        </p>
      </div>

      <div className="space-y-6">
        {/* Wave 1 - Published */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Волна 1</h3>
              <p className="text-gray-600 text-sm">100 страниц | Опубликована 3 дня назад</p>
            </div>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              ОПУБЛИКОВАНА
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-2xl font-bold text-green-600">98</p>
              <p className="text-sm text-gray-600">Проиндексировано</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Impressions: 234</p>
              <p className="text-sm text-gray-600">Clicks: 12</p>
            </div>
          </div>
        </div>

        {/* Wave 2 - Pending */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-600">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Волна 2</h3>
              <p className="text-gray-600 text-sm">100 страниц | Опубликуется завтра</p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" />
              В ОЖИДАНИИ
            </span>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
            <Upload className="w-4 h-4" />
            Опубликовать Сейчас
          </button>
        </div>

        {/* Wave 3 - Planned */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-400">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Волна 3</h3>
              <p className="text-gray-600 text-sm">100 страниц | Через 6 дней</p>
            </div>
            <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              ПЛАН
            </span>
          </div>
        </div>

        {/* Wave 4 - Future */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Волна 4 (будущая)</h3>
              <p className="text-gray-600 text-sm">695 страниц | Когда готовы</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-green-900" />
          <h3 className="font-bold text-green-900">Как работает волновая публикация?</h3>
        </div>
        <ul className="text-green-800 text-sm space-y-2">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0" /> <strong>Волна 1:</strong> Публикуем 100 страниц, ждём 3 дня</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0" /> <strong>Волна 2:</strong> Проверяем индексацию Волны 1, публикуем Волну 2</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0" /> <strong>Волна N:</strong> Процесс повторяется пока все не опубликованы</li>
          <li className="flex items-center gap-2"><BarChart3 className="w-4 h-4 flex-shrink-0" /> <strong>Результат:</strong> Естественное распределение, без пиков нагрузки</li>
        </ul>
      </div>
    </div>
  );
}
