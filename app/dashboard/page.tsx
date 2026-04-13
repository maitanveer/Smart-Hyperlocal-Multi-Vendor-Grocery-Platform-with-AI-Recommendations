'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardRedirectPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user?.role === 'admin') {
        router.replace('/dashboard/admin');
      } else if (user?.role === 'vendor') {
        router.replace('/dashboard/vendor');
      } else {
        router.replace('/dashboard/user');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20">
        <p className="text-center text-base text-slate-700 dark:text-slate-200">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
}
