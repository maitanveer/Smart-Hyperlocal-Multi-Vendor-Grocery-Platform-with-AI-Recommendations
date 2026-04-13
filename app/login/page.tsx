'use client';

import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
            Secure access
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Login to your workspace</h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Use your email, password, and role to continue to the SaaS dashboard.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
