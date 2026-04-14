'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export function NavbarContent() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SaaS
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Pricing
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Docs
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link href={isAuthenticated ? '/dashboard' : '/login'}>
              <Button variant="primary" size="sm">
                Dashboard
              </Button>
            </Link>

            {isAuthenticated && (
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Navbar() {
  return <NavbarContent />;
}
