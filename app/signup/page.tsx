'use client';

import { SignupForm } from '@/components/forms/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
            Join the platform
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Start your SaaS analytics journey with a secure signup flow.
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
