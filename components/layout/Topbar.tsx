'use client';

import { User } from 'lucide-react';

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 z-40">
      <h1 className="text-xl font-semibold text-gray-900">
        {title}
      </h1>

      <div className="flex items-center gap-4">

        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}
