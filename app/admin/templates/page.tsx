'use client';

import { useState, useRef } from 'react';
import { Palette, Plus, Eye, Download, Trash2, Lightbulb, FileText, X } from 'lucide-react';

export default function TemplatesPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [niche, setNiche] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !niche) {
      alert('Выбери файл и нишу');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('niche', niche);

      const res = await fetch('/api/templates/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('✅ Шаблон загружен!');
        setShowUploadModal(false);
        setSelectedFile(null);
        setNiche('');
      } else {
        alert('❌ Ошибка загрузки');
      }
    } catch (error) {
      alert('❌ Ошибка: ' + String(error));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Palette className="w-8 h-8 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900">Управление Шаблонами</h1>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Загрузить Шаблон
        </button>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Загрузить Шаблон</h2>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Выбери нишу:</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">-- Выбери нишу --</option>
                  <option value="santehnik">Сантехнические услуги</option>
                  <option value="electrician">Электрические услуги</option>
                  <option value="repair">Ремонт квартир</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Выбери файл HTML:</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".html,.htm"
                  onChange={handleFileSelect}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                {selectedFile && <p className="text-sm text-green-600 mt-1">✅ {selectedFile.name}</p>}
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleUpload}
                  disabled={isUploading || !selectedFile || !niche}
                  className="flex-1 bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUploading ? '⏳ Загружаю...' : '📤 Загрузить'}
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
