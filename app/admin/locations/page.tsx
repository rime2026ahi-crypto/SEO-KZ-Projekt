'use client';

import { Globe, Plus, Search, Edit, Trash2, Lightbulb, MapPin, Users } from 'lucide-react';

export default function LocationsPage() {
  const cities = [
    { city: 'almaty', region: 'Almaty Region', population: '1.4M' },
    { city: 'turgen', region: 'Zhambyl Region', population: '45K' },
    { city: 'shymkent', region: 'South Kazakhstan', population: '1.4M' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
        <Globe className="w-8 h-8 text-cyan-600" />
        <h1 className="text-3xl font-bold text-gray-900">Управление Городами</h1>
      </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Загрузить Города (CSV)
        </button>
      </div>

      <div className="mb-6 flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск по городу..."
          className="flex-1 outline-none focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        {cities.map((city) => (
          <div key={city.city} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{city.city}</h3>
                <div className="mt-2 text-sm text-gray-600 flex gap-4">
                  <p className="flex items-center gap-1"><MapPin className="w-4 h-4" />Регион: {city.region}</p>
                  <p className="flex items-center gap-1"><Users className="w-4 h-4" />Население: {city.population}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 text-sm">
                  <Edit className="w-4 h-4" />
                  Редактировать
                </button>
                <button className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm">
                  <Trash2 className="w-4 h-4" />
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Как загрузить города?</h3>
        <p className="text-blue-800 text-sm">
          Подготовь CSV файл с колонками: city, region, population, waterUtility, avgPrice
          Загрузи файл нажав кнопку выше.
        </p>
      </div>
    </div>
  );
}
