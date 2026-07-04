'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rocket, BarChart3, Building2, Palette, Globe, CheckCircle2, Upload, Link as LinkIcon, FileText } from 'lucide-react';

const navigation = [
  { name: 'Генерация', href: '/admin/generate', icon: Rocket },
  { name: 'Мониторинг', href: '/admin/monitor', icon: BarChart3 },
  { name: 'Все Страницы', href: '/admin/pages', icon: FileText },
  { name: 'Ниши', href: '/admin/niches', icon: Building2 },
  { name: 'Шаблоны', href: '/admin/templates', icon: Palette },
  { name: 'Города', href: '/admin/locations', icon: Globe },
  { name: 'Подвязать Домен', href: '/admin/attach-domain', icon: LinkIcon },
  { name: 'QA', href: '/admin/qa', icon: CheckCircle2 },
  { name: 'Публикация', href: '/admin/publish', icon: Upload },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">pSEO Platform</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
