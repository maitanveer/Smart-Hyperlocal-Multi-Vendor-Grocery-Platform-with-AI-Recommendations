'use client';

import { TrendingDown } from 'lucide-react';

interface SavingsProgressProps {
  saved: number;
  goal: number;
  period?: string;
}

export function SavingsProgress({ saved, goal, period = 'this week' }: SavingsProgressProps) {
  const percentage = Math.min((saved / goal) * 100, 100);

  return (
    <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border border-emerald-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-emerald-700">Weekly Savings</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">
            ${saved.toFixed(2)}
          </h3>
          <p className="text-xs text-emerald-600 mt-1">
            {percentage.toFixed(0)}% toward your ${goal.toFixed(2)} goal
          </p>
        </div>
        <div className="p-3 bg-white rounded-lg">
          <TrendingDown className="h-6 w-6 text-emerald-600" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-gray-600 mt-3">
        💡 Keep shopping to unlock more savings!
      </p>
    </div>
  );
}
