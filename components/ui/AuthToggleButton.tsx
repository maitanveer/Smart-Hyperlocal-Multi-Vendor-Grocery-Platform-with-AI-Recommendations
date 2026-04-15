'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogIn, UserPlus, ChevronDown } from 'lucide-react';

interface AuthToggleButtonProps {
  className?: string;
}

export function AuthToggleButton({ className = '' }: AuthToggleButtonProps) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const currentIcon = isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />;
  const currentText = isLogin ? 'Login' : 'Sign Up';
  const currentHref = isLogin ? '/login' : '/signup';
  const altText = isLogin ? 'Sign Up' : 'Login';

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Main Button */}
      <Link href={currentHref}>
        <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95">
          {currentIcon}
          <span>{currentText}</span>
        </button>
      </Link>

      {/* Toggle Button */}
      <button
        onClick={toggleMode}
        className="ml-1 rounded p-1 text-indigo-600 transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-700"
        title={`Switch to ${altText}`}
      >
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${!isLogin ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}