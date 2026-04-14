'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Store, Package, DollarSign } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { products, vendors, orders } = useProduct();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user?.role !== 'admin') {
        router.replace('/dashboard');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  // Calculate analytics data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalVendors = vendors.length;

  // Revenue over time (mock data for last 7 days)
  const revenueData = [
    { day: 'Mon', revenue: 1200 },
    { day: 'Tue', revenue: 1400 },
    { day: 'Wed', revenue: 1100 },
    { day: 'Thu', revenue: 1600 },
    { day: 'Fri', revenue: 1800 },
    { day: 'Sat', revenue: 2200 },
    { day: 'Sun', revenue: 1900 },
  ];

  // Orders by category
  const categoryData = [
    { name: 'Fruits & Vegetables', value: 35, color: '#10b981' },
    { name: 'Dairy', value: 25, color: '#3b82f6' },
    { name: 'Bakery', value: 20, color: '#f59e0b' },
    { name: 'Meat & Poultry', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' },
  ];

  // Top vendors by revenue
  const vendorRevenue = vendors.map(vendor => {
    const vendorOrders = orders.filter(order =>
      order.vendorId === vendor.id
    );
    const revenue = vendorOrders.reduce((sum, order) => {
      return sum + order.total;
    }, 0);
    return { name: vendor.name, revenue };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Platform Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Comprehensive insights into platform performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(0)}`}
          icon={DollarSign}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders.toString()}
          icon={Package}
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Active Vendors"
          value={totalVendors.toString()}
          icon={Store}
          trend="+15%"
          trendUp={true}
        />
        <StatsCard
          title="Total Products"
          value={totalProducts.toString()}
          icon={TrendingUp}
          trend="+5%"
          trendUp={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendorRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
