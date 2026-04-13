'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 4000, target: 2400 },
  { month: 'Feb', revenue: 3000, target: 1398 },
  { month: 'Mar', revenue: 2000, target: 9800 },
  { month: 'Apr', revenue: 2780, target: 3908 },
  { month: 'May', revenue: 1890, target: 4800 },
  { month: 'Jun', revenue: 2390, target: 3800 },
  { month: 'Jul', revenue: 3490, target: 4300 },
];

const userActivityData = [
  { day: 'Mon', active: 4000, inactive: 2400 },
  { day: 'Tue', active: 3000, inactive: 1398 },
  { day: 'Wed', active: 2000, inactive: 9800 },
  { day: 'Thu', active: 2780, inactive: 3908 },
  { day: 'Fri', active: 1890, inactive: 4800 },
  { day: 'Sat', active: 2390, inactive: 3800 },
  { day: 'Sun', active: 3490, inactive: 4300 },
];

export default function AdminDashboardPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user?.role !== 'admin') {
        router.replace('/dashboard/user');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Admin dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              Welcome back, {user.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage teams, review analytics, and keep the platform running smoothly.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              View traffic, conversion, and engagement data across your product.
            </p>
            <Link href="/dashboard/analytics">
              <Button variant="primary">Open Analytics</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Update profile and security settings for your account.
            </p>
            <Link href="/dashboard/settings">
              <Button variant="secondary">Open Settings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$124,560"
          icon={<DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
          trend={{ value: 12.5, direction: 'up' }}
          backgroundColor="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Users"
          value="8,234"
          icon={<Users className="h-8 w-8 text-green-600 dark:text-green-400" />}
          trend={{ value: 8.2, direction: 'up' }}
          backgroundColor="bg-green-50 dark:bg-green-950"
          iconColor="text-green-600"
        />
        <StatCard
          title="Conversion Rate"
          value="4.2%"
          icon={<TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
          trend={{ value: 0.5, direction: 'down' }}
          backgroundColor="bg-purple-50 dark:bg-purple-950"
          iconColor="text-purple-600"
        />
        <StatCard
          title="System Uptime"
          value="99.98%"
          icon={<Activity className="h-8 w-8 text-orange-600 dark:text-orange-400" />}
          trend={{ value: 0.1, direction: 'up' }}
          backgroundColor="bg-orange-50 dark:bg-orange-950"
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue Trend" description="Monthly revenue vs target">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="User Activity" description="Active vs inactive users by day">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#10b981" />
              <Bar dataKey="inactive" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operational overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: 'User signup',
                user: 'John Doe',
                time: '2 hours ago',
              },
              {
                action: 'Payment received',
                user: 'Acme Corp',
                time: '4 hours ago',
              },
              {
                action: 'Integration connected',
                user: 'Tech Startup',
                time: '6 hours ago',
              },
              {
                action: 'Report exported',
                user: 'Jane Smith',
                time: '8 hours ago',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800 last:border-0"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {activity.user}
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activity.time}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
