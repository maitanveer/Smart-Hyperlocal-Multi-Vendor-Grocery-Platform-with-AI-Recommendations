'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';

export default function VendorDashboardPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { orders, products } = useProduct();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user?.role !== 'vendor') {
        router.replace('/dashboard/user');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || user?.role !== 'vendor') {
    return null;
  }

  const vendorProducts = products.filter(p => p.vendorId === user.email);
  const vendorOrders = orders.filter(o => o.vendorId === user.email);
  const totalRevenue = vendorOrders
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = vendorOrders.filter(o => o.status === 'pending').length;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Vendor dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              Welcome back, {user.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage your products and track orders from your grocery store.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add new products or manage your existing inventory.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard/vendor/add-product">
                <Button variant="primary">Add Product</Button>
              </Link>
              <Link href="/dashboard/vendor/products">
                <Button variant="secondary">View Products</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track and manage customer orders.
            </p>
            <Link href="/dashboard/vendor/orders">
              <Button variant="primary">View Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={vendorProducts.length.toString()}
          icon={Package}
          backgroundColor="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Orders"
          value={vendorOrders.length.toString()}
          icon={ShoppingCart}
          backgroundColor="bg-green-50 dark:bg-green-950"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          backgroundColor="bg-purple-50 dark:bg-purple-950"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Pending Orders"
          value={pendingOrders.toString()}
          icon={TrendingUp}
          backgroundColor="bg-orange-50 dark:bg-orange-950"
          iconColor="text-orange-600"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800 last:border-0"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Order #{order.id.slice(-6)}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {order.userName} • {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : order.status === 'confirmed'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {vendorOrders.length === 0 && (
              <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                No orders yet. Start by adding some products!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
