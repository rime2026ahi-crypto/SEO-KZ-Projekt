'use client';

import { useState } from 'react';
import { Building2, Edit, Trash2, Plus, Wrench, Lock, Zap, FileText, Calendar, X } from 'lucide-react';

export default function NichesPage() {
  const [niches, setNiches] = useState([
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
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newNiche, setNewNiche] = useState({ name: '', slug: '' });

  const handleAddNiche = () => {
    if (!newNiche.name || !newNiche.slug) {
      alert('Заполни все поля');
      return;
    }

    const niche = {
      id: newNiche.slug,
      icon: Wrench,
      name: newNiche.name,
      services: 0,
      created: new Date().toISOString().split('T')[0],
    };

    setNiches([...niches, niche]);
    setNewNiche({ name: '', slug: '' });
    setShowAddModal(false);
    alert('✅ Ниша добавлена!');
  };

  const handleDeleteNiche = (id: string) => {
    if (confirm('Удалить нишу?')) {
      setNiches(niches.filter(n => n.id !== id));
      alert('✅ Ниша удалена!');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Управление Нишами</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Добавить Нишу
        </button>
      </div>

      <div className="space-y-4">
        {niches.map((niche) => {
          const Icon = niche.icon;
          return (
            <div key={niche.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">{niche.name}</h3>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 flex gap-4">
                    <p className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Услуг: {niche.services}
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {niche.created}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteNiche(niche.id)}
                  className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Добавить Нишу</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Название ниши"
                value={newNiche.name}
                onChange={(e) => setNewNiche({ ...newNiche, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Slug (латиница)"
                value={newNiche.slug}
                onChange={(e) => setNewNiche({ ...newNiche, slug: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <button
                onClick={handleAddNiche}
                className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                ✅ Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
