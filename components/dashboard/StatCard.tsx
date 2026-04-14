import { Card, CardContent } from '@/components/ui/Card';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  backgroundColor?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  backgroundColor = 'bg-blue-50 dark:bg-blue-950',
  iconColor = 'text-blue-600 dark:text-blue-400',
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 right-0 h-16 w-16 rounded-full ${backgroundColor} opacity-30`} />

      <CardContent className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {trend && (
              <p
                className={`mt-2 text-xs font-medium ${
                  trend.direction === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}% from last month
              </p>
            )}
          </div>
          <div className={`text-3xl rounded-lg p-2 bg-opacity-10 ${backgroundColor}`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
