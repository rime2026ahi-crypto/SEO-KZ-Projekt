'use client';

import { Palette, Plus, Eye, Download, Trash2, Lightbulb, FileText } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Palette className="w-8 h-8 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900">Управление Шаблонами</h1>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Загрузить Шаблон
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">sample.html</h3>
          </div>
          <p className="text-gray-600 text-sm mt-2">Ниша: Сантехнические услуги</p>
          <p className="text-gray-600 text-sm">Загружен: 2024-06-15</p>
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 text-sm">
              <Eye className="w-4 h-4" />
              Просмотр
            </button>
            <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm">
              <Download className="w-4 h-4" />
              Скачать
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">locks.html</h3>
          </div>
          <p className="text-gray-600 text-sm mt-2">Ниша: Услуги слесаря</p>
          <p className="text-gray-600 text-sm">Загружен: 2024-06-20</p>
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 text-sm">
              <Eye className="w-4 h-4" />
              Просмотр
            </button>
            <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm">
              <Download className="w-4 h-4" />
              Скачать
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Как создать шаблон?</h3>
        <p className="text-blue-800 text-sm mb-2">
          Шаблон - это HTML дизайн страницы с специальными маркерами (data-pseo-*).
        </p>
        <p className="text-blue-800 text-sm">
          Смотри <strong>TEMPLATE_GUIDE.md</strong> в документации для полного руководства.
        </p>
      </div>
    </div>
  );
}
