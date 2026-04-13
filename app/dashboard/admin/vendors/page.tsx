'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Store, Package, TrendingUp, Users } from 'lucide-react';

export default function AdminVendorsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { vendors, products, orders } = useProduct();
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

  const getVendorStats = (vendorId: string) => {
    const vendorProducts = products.filter(p => p.vendorId === vendorId);
    const vendorOrders = orders.filter(order =>
      order.items.some(item => item.vendorId === vendorId)
    );
    const totalRevenue = vendorOrders.reduce((sum, order) => {
      const vendorItems = order.items.filter(item => item.vendorId === vendorId);
      return sum + vendorItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
    }, 0);

    return {
      products: vendorProducts.length,
      orders: vendorOrders.length,
      revenue: totalRevenue,
    };
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Vendor Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Monitor and manage all vendors on the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Store className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Vendors
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {vendors.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {products.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {orders.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active Vendors
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {vendors.filter(v => v.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendors.map((vendor) => {
              const stats = getVendorStats(vendor.id);
              return (
                <div key={vendor.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <Store className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {vendor.location} • {vendor.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {stats.products}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Products
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {stats.orders}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Orders
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        ${stats.revenue.toFixed(0)}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Revenue
                      </p>
                    </div>
                    <Badge className={vendor.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}>
                      {vendor.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
