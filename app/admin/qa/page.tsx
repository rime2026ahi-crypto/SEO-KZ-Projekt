'use client';

import { useState } from 'react';
import { CheckCircle2, Eye, Lightbulb, ChevronLeft, ChevronRight, AlertCircle, Trash2, Edit, BarChart3 } from 'lucide-react';

export default function QAPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handleApprovePage = () => {
    alert('✅ Страница одобрена!');
    nextPage();
  };

  const handleRejectPage = () => {
    alert('❌ Страница отклонена и будет переделана');
    nextPage();
  };

  const handleEditPage = () => {
    alert('✏️ Редактирование страницы...');
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <CheckCircle2 className="w-8 h-8 text-yellow-600" />
        <h1 className="text-3xl font-bold text-gray-900">QA Проверка Качества</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <div className="text-sm text-gray-600">Требует проверки</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">990</div>
            <div className="text-sm text-gray-600">Одобрено</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">5</div>
            <div className="text-sm text-gray-600">Отклонено</div>
          </div>
        </div>

        {/* Pending Review Item */}
        <div className="border-2 border-yellow-300 rounded-lg p-6 bg-yellow-50 mb-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">almaty-remont-trub</h3>
            <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">Ниша: Сантехнические услуги | Статус: <AlertCircle className="w-4 h-4 text-yellow-600" /> Требует проверки</p>
          </div>

          <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200">
            <p className="text-gray-700 text-sm">
              Ремонт труб в Алматы - быстро, надежно и по доступным ценам. Наша команда опытных мастеров...
            </p>
            <p className="text-gray-500 text-xs mt-2">[Показать весь текст...]</p>
          </div>

          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" /> <strong>Скор уникальности:</strong> 82% <AlertCircle className="w-4 h-4 text-yellow-600" />
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleApprovePage}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
            >
              <CheckCircle2 className="w-4 h-4" />
              Одобрить
            </button>
            <button
              onClick={handleRejectPage}
              className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
            >
              <AlertCircle className="w-4 h-4" />
              Отклонить
            </button>
            <button
              onClick={handleEditPage}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-4 h-4" />
              Редактировать
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>Страница {currentPage} из {totalPages}</p>
          <div className="flex justify-center gap-2 mt-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-green-900" />
          <h3 className="font-bold text-green-900">Как проверить?</h3>
        </div>
        <p className="text-green-800 text-sm">
          Просмотри текст, проверь скор уникальности (должен быть выше 40%), потом нажми Одобрить или Отклонить.
          Отклоненные страницы будут переделаны автоматически.
        </p>
      </div>
    </div>
  );
}
