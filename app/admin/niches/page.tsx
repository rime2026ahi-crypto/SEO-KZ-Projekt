'use client';

import { Building2, Edit, Trash2, Plus, Lightbulb, Wrench, Lock, Zap, FileText, Calendar } from 'lucide-react';

export default function NichesPage() {
  const niches = [
    {
      id: 'santehnik',
      icon: Wrench,
      name: 'Сантехнические услуги',
      services: 5,
      created: '2024-06-15',
    },
    {
      id: 'slesari',
      icon: Lock,
      name: 'Услуги слесаря',
      services: 3,
      created: '2024-06-20',
    },
    {
      id: 'electricity',
      icon: Zap,
      name: 'Электрические услуги',
      services: 4,
      created: '2024-06-25',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Управление Нишами</h1>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Добавить Нишу
        </button>
      </div>

      <div className="space-y-4">
        {niches.map((niche) => {
          const Icon = niche.icon;
          return (
          <div key={niche.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">{niche.name}</h3>
                </div>
                <div className="mt-2 text-sm text-gray-600 flex gap-4">
                  <p className="flex items-center gap-1"><FileText className="w-4 h-4" />Услуг: {niche.services}</p>
                  <p className="flex items-center gap-1"><Calendar className="w-4 h-4" />Создана: {niche.created}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                  <Edit className="w-4 h-4" />
                  Редактировать
                </button>
                <button className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                  <Trash2 className="w-4 h-4" />
                  Удалить
                </button>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-blue-900" />
          <h3 className="font-bold text-blue-900">Как создать нишу?</h3>
        </div>
        <p className="text-blue-800 text-sm">
          Ниша - это категория услуг (сантехник, электрик и т.д.). Каждая ниша может иметь несколько услуг.
          Нажми "+ Добавить Нишу" для создания новой.
        </p>
      </div>
    </div>
  );
}
