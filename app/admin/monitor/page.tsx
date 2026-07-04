'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Clock, AlertCircle, Search, Loader2, CheckCircle2, XCircle, Timer, ClipboardList } from 'lucide-react';

interface GenerationStatus {
  batchId: string;
  status: 'pending' | 'generating' | 'complete' | 'error';
  progress: number;
  total: number;
  completed: number;
  failed: number;
  unique: number;
  duplicates: number;
  estimatedTimeRemaining: number;
  logs: string[];
}

export default function MonitorPage() {
  const [status, setStatus] = useState<GenerationStatus | null>(null);
  const [batchId, setBatchId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatus = async () => {
    if (!batchId) {
      alert('Введи Batch ID!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/generate/status?batchId=${batchId}`);
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      alert('Ошибка при получении статуса');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status && status.status === 'generating') {
      const timer = setInterval(fetchStatus, 3000);
      return () => clearInterval(timer);
    }
  }, [status]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900">Мониторинг Генерации</h1>
      </div>

      {/* Batch ID Input */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            placeholder="Введи Batch ID (получишь после запуска генерации)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={fetchStatus}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                Загружаю...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Проверить
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Display */}
      {status ? (
        <div className="space-y-6">
          {/* Status Header */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Batch: {status.batchId}</h2>
              <div className="text-right">
                {status.status === 'generating' && (
                  <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    В процессе
                  </span>
                )}
                {status.status === 'complete' && (
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Завершено
                  </span>
                )}
                {status.status === 'error' && (
                  <span className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full font-bold">
                    <XCircle className="w-4 h-4" />
                    Ошибка
                  </span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Прогресс</span>
                <span className="text-sm font-semibold text-gray-700">
                  {status.progress}% ({status.completed}/{status.total})
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${status.progress}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{status.completed}</div>
                <div className="text-sm text-gray-600">Готово</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{status.unique}</div>
                <div className="text-sm text-gray-600">Уникальные</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{status.duplicates}</div>
                <div className="text-sm text-gray-600">Дубликаты</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{status.failed}</div>
                <div className="text-sm text-gray-600">Ошибок</div>
              </div>
            </div>

            {/* Estimated Time */}
            {status.status === 'generating' && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Примерное время до завершения: <strong>{status.estimatedTimeRemaining} мин</strong>
                </p>
              </div>
            )}
          </div>

          {/* Logs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Логи
            </h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
              {status.logs.map((log, idx) => (
                <div key={idx} className="text-xs">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Нет данных</h3>
          <p className="text-gray-600">
            Введи Batch ID из сообщения после запуска генерации и нажми "Проверить"
          </p>
        </div>
      )}
    </div>
  );
}
