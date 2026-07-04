'use client';

import { useState } from 'react';
import { ChevronLeft, Rocket, Lightbulb, Eye, Globe, Newspaper, BookOpen, HelpCircle } from 'lucide-react';

type Mode = 'mode1' | 'mode2' | null;

export default function GeneratePage() {
  const [mode, setMode] = useState<Mode>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mode 1 state
  const [niche, setNiche] = useState('');
  const [cities, setCities] = useState('');
  const [services, setServices] = useState<string[]>([]);

  // Mode 2 state
  const [keyword, setKeyword] = useState('');
  const [contentType, setContentType] = useState<'blog' | 'guide' | 'faq'>('blog');
  const [articleCount, setArticleCount] = useState(100);

  const handleGenerateMode1 = async () => {
    if (!niche || !cities || services.length === 0) {
      alert('Заполни все поля!');
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      const response = await fetch('/api/generate/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'mode1',
          niche,
          cities: cities.split('\n').filter(c => c.trim()),
          services,
        }),
      });

      const data = await response.json();
      alert(`✅ Генерация запущена! Batch ID: ${data.batchId}`);
    } catch (error) {
      alert('❌ Ошибка при запуске генерации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMode2 = async () => {
    if (!keyword) {
      alert('Введи ключевое слово!');
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      const response = await fetch('/api/generate/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'mode2',
          keyword,
          contentType,
          articleCount,
        }),
      });

      const data = await response.json();
      alert(`✅ Генерация запущена! Batch ID: ${data.batchId}`);
    } catch (error) {
      alert('❌ Ошибка при запуске генерации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Rocket className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Генерация Страниц</h1>
      </div>

      {!mode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mode 1 Card */}
          <button
            onClick={() => setMode('mode1')}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-left border-2 border-transparent hover:border-blue-600"
          >
            <Globe className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Режим 1: По Городам</h2>
            <p className="text-gray-600 mb-4">
              Генерируй страницы для каждого города + услуга
            </p>
            <div className="bg-blue-50 p-3 rounded text-sm text-gray-700">
              <strong>Результат:</strong> 1000-7000 локализованных страниц<br />
              <strong>Пример:</strong> /almaty-remont-trub/, /turgen-remont-trub/
            </div>
          </button>

          {/* Mode 2 Card */}
          <button
            onClick={() => setMode('mode2')}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow text-left border-2 border-transparent hover:border-green-600"
          >
            <Lightbulb className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Режим 2: По Ключевым Словам</h2>
            <p className="text-gray-600 mb-4">
              Генерируй информационные статьи по одному ключевому слову
            </p>
            <div className="bg-green-50 p-3 rounded text-sm text-gray-700">
              <strong>Результат:</strong> 50-200 информационных статей<br />
              <strong>Пример:</strong> /blog/kak-diagnostirovat/, /blog/materialy-dlya-remonta/
            </div>
          </button>
        </div>
      ) : mode === 'mode1' ? (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <button
            onClick={() => setMode(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Вернуться к выбору режима
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Режим 1: Генерация по Городам</h2>

          {/* Niche Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs mr-2">1</span>
              Выбери нишу (услугу)
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">-- Выбери нишу --</option>
              <option value="santehnik">Сантехнические услуги</option>
              <option value="slesari">Услуги слесаря</option>
              <option value="electricity">Электрические услуги</option>
            </select>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Lightbulb className="w-3 h-3" />Если нужна новая ниша, создай её в разделе "Ниши"</p>
          </div>

          {/* Cities Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs mr-2">2</span>
              Введи города (один на строку)
            </label>
            <textarea
              value={cities}
              onChange={(e) => setCities(e.target.value)}
              placeholder="almaty&#10;turgen&#10;shymkent&#10;..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
            />
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Lightbulb className="w-3 h-3" />Или загрузи CSV файл с городами</p>
          </div>

          {/* Services Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs mr-2">3</span>
              Выбери услуги
            </label>
            <div className="space-y-2">
              {['remont-trub', 'ustranenie-zasora', 'remont-unitaza'].map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={services.includes(service)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setServices([...services, service]);
                      } else {
                        setServices(services.filter((s) => s !== service));
                      }
                    }}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="text-gray-700">{service}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Lightbulb className="w-3 h-3" />Выбери минимум 1 услугу</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleGenerateMode1}
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? 'Запускаю...' : 'Запустить Генерацию'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          <button
            onClick={() => setMode(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Вернуться к выбору режима
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Режим 2: Генерация Статей по Ключевым Словам</h2>

          {/* Keyword Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs mr-2">1</span>
              Введи главное ключевое слово
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Например: как отремонтировать трубу"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Lightbulb className="w-3 h-3" />
              Примеры: "как открыть замок", "электричество в доме"
            </p>
          </div>

          {/* Content Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs mr-2">2</span>
              Выбери тип контента
            </label>
            <div className="space-y-2">
              {(['blog', 'guide', 'faq'] as const).map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    checked={contentType === type}
                    onChange={() => setContentType(type)}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="text-gray-700 font-medium flex items-center gap-2">
                    {type === 'blog' && <><Newspaper className="w-4 h-4" />Blog (информационные статьи)</>}
                    {type === 'guide' && <><BookOpen className="w-4 h-4" />Guide (пошаговые инструкции)</>}
                    {type === 'faq' && <><HelpCircle className="w-4 h-4" />FAQ (вопросы и ответы)</>}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Article Count */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs mr-2">3</span>
              Сколько статей нужно?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="50"
                max="200"
                step="10"
                value={articleCount}
                onChange={(e) => setArticleCount(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-bold text-gray-900 w-16">{articleCount}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Минимум: 50, Максимум: 200</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleGenerateMode2}
              disabled={isLoading}
              className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? 'Запускаю...' : 'Запустить Генерацию'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
