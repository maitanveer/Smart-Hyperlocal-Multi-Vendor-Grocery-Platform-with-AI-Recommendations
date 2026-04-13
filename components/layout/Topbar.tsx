'use client';

import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, User } from 'lucide-react';

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-0 left-64 right-0 h-16 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 flex items-center justify-between px-8 z-40">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-600" />
          ) : (
            <Sun className="h-5 w-5 text-gray-400" />
          )}
        </button>

        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}
