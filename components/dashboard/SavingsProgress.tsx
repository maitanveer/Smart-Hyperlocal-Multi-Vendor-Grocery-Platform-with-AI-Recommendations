'use client';

import { TrendingDown, Award } from 'lucide-react';

interface SavingsProgressProps {
  saved: number;
  goal: number;
  period?: string;
}

export function SavingsProgress({ saved, goal, period = 'this week' }: SavingsProgressProps) {
  const percentage = Math.min((saved / goal) * 100, 100);
  const remaining = Math.max(goal - saved, 0);

  return (
    <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-750 p-6 border border-emerald-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-start justify-between mb-5">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
            Weekly Savings
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            ${saved.toFixed(2)}
          </h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-300 font-medium mt-2">
            {percentage.toFixed(0)}% of your ${goal.toFixed(2)} goal
            {remaining > 0 && ` • $${remaining.toFixed(2)} to go`}
          </p>
        </div>
        <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <TrendingDown className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner mb-4">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Motivational Message */}
      <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
        <Award className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>
          {percentage >= 100
            ? '🎉 Goal achieved! Keep shopping to earn more rewards!'
            : `💡 ${remaining > 0 ? `Add $${remaining.toFixed(2)} more to reach your goal!` : 'Almost there!'}`}
        </span>
      </div>
    </div>
  );
}
