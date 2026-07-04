'use client';

import { useState } from 'react';
import { Link as LinkIcon, CheckCircle2, AlertCircle } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
  status: 'draft' | 'pending_qa' | 'published';
  created_at: string;
}

export default function AttachDomainPage() {
  const [pages, setPages] = useState<Page[]>([
    { id: '1', slug: 'almaty-remont-trub', title: 'Ремонт труб в Алматы', status: 'published', created_at: '2024-06-15' },
    { id: '2', slug: 'turgen-remont-trub', title: 'Ремонт труб в Тургене', status: 'published', created_at: '2024-06-15' },
    { id: '3', slug: 'shymkent-remont-trub', title: 'Ремонт труб в Шымкенте', status: 'published', created_at: '2024-06-15' },
    { id: '4', slug: 'almaty-ustranenie-zasora', title: 'Устранение засора в Алматы', status: 'published', created_at: '2024-06-15' },
    { id: '5', slug: 'turgen-ustranenie-zasora', title: 'Устранение засора в Тургене', status: 'published', created_at: '2024-06-15' },
  ]);

  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set());
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const togglePage = (pageId: string) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(pageId)) {
      newSelected.delete(pageId);
    } else {
      newSelected.add(pageId);
    }
    setSelectedPages(newSelected);
  };

  const toggleAll = () => {
    if (selectedPages.size === pages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(pages.map(p => p.id)));
    }
  };

  const handleAttachDomain = async () => {
    if (!domain.trim()) {
      setMessage({ type: 'error', text: 'Введи домен!' });
      return;
    }

    if (selectedPages.size === 0) {
      setMessage({ type: 'error', text: 'Выбери хотя бы одну страницу!' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/attach-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain,
          pageIds: Array.from(selectedPages)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `✅ ${selectedPages.size} страниц успешно подвязаны к домену ${domain}!`
        });
        setSelectedPages(new Set());
        setDomain('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Ошибка при подвязке домена' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка при подвязке домена' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <LinkIcon className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">Подвязать Страницы к Домену</h1>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <p className="text-blue-900 font-semibold mb-2">📌 Как это работает:</p>
        <ol className="text-blue-800 text-sm space-y-1 ml-4">
          <li>1. Выбери страницы которые хочешь подвязать</li>
          <li>2. Введи домен (например: santehnik.kz)</li>
          <li>3. Нажми "ПОДВЯЗАТЬ" - готово!</li>
          <li>4. Страницы будут видны на домене</li>
        </ol>
      </div>

      {/* Messages */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Pages List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Сгенерированные Страницы</h2>

          {/* Select All */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPages.size === pages.length && pages.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 mr-3"
              />
              <span className="font-semibold text-gray-700">
                Выбрать все ({pages.length})
              </span>
              <span className="ml-auto text-sm text-gray-500">
                Выбрано: {selectedPages.size}
              </span>
            </label>
          </div>

          {/* Pages List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pages.map((page) => (
              <div key={page.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedPages.has(page.id)}
                  onChange={() => togglePage(page.id)}
                  className="w-4 h-4 mt-1 mr-3"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{page.title}</p>
                  <p className="text-sm text-gray-500 font-mono">{page.slug}</p>
                  <div className="flex gap-2 mt-2">
                    {page.status === 'published' && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        ✅ Опубликована
                      </span>
                    )}
                    {page.status === 'pending_qa' && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        ⚠️ На проверке
                      </span>
                    )}
                    {page.status === 'draft' && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        📝 Черновик
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Показано 5 из ~1000 страниц. Прокрути для просмотра...
          </p>
        </div>

        {/* Right: Domain Input */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg p-8 h-fit">
          <h3 className="text-xl font-bold text-gray-900 mb-6">⚙️ Настройка Домена</h3>

          {/* Domain Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Введи домен
            </label>
            <input
              type="text"
              placeholder="например: santehnik.kz"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">
              Домен должен быть зарегистрирован и настроен на сервер
            </p>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-purple-600">{selectedPages.size}</p>
                <p className="text-xs text-gray-600">Страниц выбрано</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{pages.length}</p>
                <p className="text-xs text-gray-600">Доступно</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={handleAttachDomain}
            disabled={isLoading || selectedPages.size === 0 || !domain.trim()}
            className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
              isLoading || selectedPages.size === 0 || !domain.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            <LinkIcon className="w-5 h-5" />
            {isLoading ? 'Подвязываю...' : `🔗 ПОДВЯЗАТЬ ${selectedPages.size} СТРАНИЦ`}
          </button>

          <p className="text-xs text-center text-gray-600 mt-4">
            После подвязки страницы будут доступны на домене
          </p>

          {/* Info Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">💡 Что происходит?</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✅ Все {selectedPages.size} страниц привязываются к домену</li>
              <li>✅ URL будет: {domain || 'example.kz'}/almaty-remont-trub</li>
              <li>✅ Страницы видны на домене</li>
              <li>✅ Можно потом опубликовать в Google</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
