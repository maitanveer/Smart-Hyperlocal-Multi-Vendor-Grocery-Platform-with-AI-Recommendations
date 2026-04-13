'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
  ShoppingBag,
  Package,
  Plus,
  Users,
  Store,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const getNavItems = (role: string) => {
  const baseItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];

  switch (role) {
    case 'user':
      return [
        ...baseItems,
        {
          label: 'Products',
          href: '/dashboard/user/products',
          icon: ShoppingBag,
        },
        {
          label: 'Cart',
          href: '/dashboard/user/cart',
          icon: Package,
        },
        {
          label: 'Orders',
          href: '/dashboard/user/orders',
          icon: BarChart3,
        },
      ];
    case 'vendor':
      return [
        ...baseItems,
        {
          label: 'Products',
          href: '/dashboard/vendor/products',
          icon: Store,
        },
        {
          label: 'Add Product',
          href: '/dashboard/vendor/add-product',
          icon: Plus,
        },
        {
          label: 'Orders',
          href: '/dashboard/vendor/orders',
          icon: Package,
        },
      ];
    case 'admin':
      return [
        ...baseItems,
        {
          label: 'Analytics',
          href: '/dashboard/analytics',
          icon: BarChart3,
        },
        {
          label: 'Vendors',
          href: '/dashboard/admin/vendors',
          icon: Store,
        },
        {
          label: 'Users',
          href: '/dashboard/admin/users',
          icon: Users,
        },
      ];
    default:
      return baseItems;
  }
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const navItems = getNavItems(user?.role || '');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 pt-20">
      <div className="px-4 pb-4 pt-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
          {user?.role === 'user' ? 'Shopping' : user?.role === 'vendor' ? 'Store' : 'Admin'}
        </p>
      </div>
      <div className="flex flex-col gap-1 px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (pathname === '/dashboard' && item.href === '/dashboard');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white dark:bg-blue-600'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="absolute bottom-6 w-full px-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-gray-800"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
