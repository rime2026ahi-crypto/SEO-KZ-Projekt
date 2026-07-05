'use client';

import { useState, useRef } from 'react';
import { Globe, Plus, Search, Edit, Trash2, MapPin, Users, X } from 'lucide-react';

export default function LocationsPage() {
  const [cities, setCities] = useState([
    { id: '1', name: 'almaty', region: 'Almaty Region', population: '1.4M' },
    { id: '2', name: 'shymkent', region: 'South Kazakhstan', population: '1.4M' },
    { id: '3', name: 'karaganda', region: 'Karaganda Region', population: '650K' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCity, setNewCity] = useState({ name: '', region: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCity = async () => {
    if (!newCity.name || !newCity.region) {
      alert('Заполни все поля');
      return;
    }

    const city = { ...newCity, id: Date.now().toString() };
    setCities([...cities, city]);
    setNewCity({ name: '', region: '' });
    setShowAddModal(false);
    alert('✅ Город добавлен!');
  };

  const handleDeleteCity = (id: string) => {
    if (confirm('Удалить город?')) {
      setCities(cities.filter(c => c.id !== id));
      alert('✅ Город удален!');
    }
  };

  const handleUploadCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split('\n');
    const newCities = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const [name, region] = lines[i].split(',').map(s => s.trim());
      if (name && region) {
        newCities.push({ id: Date.now().toString() + i, name, region });
      }
    }

    setCities([...cities, ...newCities]);
    setShowUploadModal(false);
    alert(`✅ Загружено ${newCities.length} городов!`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8 text-cyan-600" />
          <h1 className="text-3xl font-bold text-gray-900">Управление Городами</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Добавить Город
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Загрузить CSV
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск по городу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none"
        />
      </div>

      <div className="space-y-4">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div key={city.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
                  <div className="mt-2 text-sm text-gray-600 flex gap-4">
                    <p className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {city.region}
                    </p>
                    <p className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Всего 1
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteCity(city.id)}
                  className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">Города не найдены</p>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Добавить Город</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Название города"
                value={newCity.name}
                onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Регион"
                value={newCity.region}
                onChange={(e) => setNewCity({ ...newCity, region: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                onClick={handleAddCity}
                className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                ✅ Добавить
              </button>
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Загрузить CSV</h2>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleUploadCSV}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
