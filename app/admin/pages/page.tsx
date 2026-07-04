'use client';

import { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface Page {
  id: string;
  slug: string;
  title: string;
  domain: string | null;
  status: 'draft' | 'pending_qa' | 'published';
  words: number;
  created_at: string;
  published_at: string | null;
}

export default function PagesListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending_qa' | 'published'>('all');
  const [domainFilter, setDomainFilter] = useState('all');

  // Mock данные - в реальности будут из БД
  const [pages] = useState<Page[]>([
    {
      id: '1',
      slug: 'almaty-remont-trub',
      title: 'Ремонт труб в Алматы - быстро и надежно',
      domain: 'santehnik.kz',
      status: 'published',
      words: 1250,
      created_at: '2024-06-15',
      published_at: '2024-06-18'
    },
    {
      id: '2',
      slug: 'turgen-remont-trub',
      title: 'Ремонт труб в Тургене - профессионально',
      domain: 'santehnik.kz',
      status: 'published',
      words: 1180,
      created_at: '2024-06-15',
      published_at: '2024-06-19'
    },
    {
      id: '3',
      slug: 'shymkent-remont-trub',
      title: 'Ремонт труб в Шымкенте - 24/7',
      domain: 'santehnik.kz',
      status: 'published',
      words: 1340,
      created_at: '2024-06-15',
      published_at: '2024-06-20'
    },
    {
      id: '4',
      slug: 'almaty-ustranenie-zasora',
      title: 'Устранение засора в Алматы',
      domain: null,
      status: 'pending_qa',
      words: 950,
      created_at: '2024-06-16',
      published_at: null
    },
    {
      id: '5',
      slug: 'turgen-ustranenie-zasora',
      title: 'Устранение засора в Тургене',
      domain: null,
      status: 'draft',
      words: 820,
      created_at: '2024-06-16',
      published_at: null
    },
    {
      id: '6',
      slug: 'almaty-elektrik',
      title: 'Электрик в Алматы - срочный выезд',
      domain: 'elektrik.kz',
      status: 'published',
      words: 1100,
      created_at: '2024-06-17',
      published_at: '2024-06-20'
    },
  ]);

  // Фильтрация
  const filtered = pages.filter(page => {
    const matchSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || page.status === statusFilter;
    const matchDomain = domainFilter === 'all' || page.domain === domainFilter;
    return matchSearch && matchStatus && matchDomain;
  });

  // Статистика
  const totalPages = pages.length;
  const publishedCount = pages.filter(p => p.status === 'published').length;
  const pendingCount = pages.filter(p => p.status === 'pending_qa').length;
  const draftCount = pages.filter(p => p.status === 'draft').length;
  const withDomain = pages.filter(p => p.domain).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending_qa':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending_qa':
        return <AlertCircle className="w-4 h-4" />;
      case 'draft':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Опубликована';
      case 'pending_qa':
        return 'На проверке';
      case 'draft':
        return 'Черновик';
      default:
        return status;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Все Страницы</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-600">
          <p className="text-2xl font-bold text-blue-600">{totalPages}</p>
          <p className="text-sm text-gray-600">Всего страниц</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600">
          <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
          <p className="text-sm text-gray-600">Опубликовано</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-600">
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          <p className="text-sm text-gray-600">На проверке</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-600">
          <p className="text-2xl font-bold text-gray-600">{draftCount}</p>
          <p className="text-sm text-gray-600">Черновики</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-600">
          <p className="text-2xl font-bold text-purple-600">{withDomain}</p>
          <p className="text-sm text-gray-600">На доменах</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию или slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Все статусы</option>
              <option value="published">Опубликованы</option>
              <option value="pending_qa">На проверке</option>
              <option value="draft">Черновики</option>
            </select>
          </div>

          {/* Domain Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Все домены</option>
              <option value="santehnik.kz">santehnik.kz</option>
              <option value="elektrik.kz">elektrik.kz</option>
              <option value={null as any}>Без домена</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Название</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Slug</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Домен</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Статус</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Слов</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Создана</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((page, idx) => (
                  <tr key={page.id} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{page.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{page.published_at && `Опубликована: ${page.published_at}`}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{page.slug}</td>
                    <td className="px-6 py-4">
                      {page.domain ? (
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {page.domain}
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(page.status)}`}>
                        {getStatusIcon(page.status)}
                        {getStatusLabel(page.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{page.words}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{page.created_at}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors" title="Просмотр">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Редактировать">
                          <Edit className="w-4 h-4 text-green-600" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Удалить">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Страницы не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
          Показано: <strong>{filtered.length}</strong> из <strong>{totalPages}</strong> страниц
        </div>
      </div>
    </div>
  );
}
