'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Users, ShoppingBag, Package, UserCheck } from 'lucide-react';

export default function AdminUsersPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { orders } = useProduct();
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

  // Mock users data - in a real app this would come from an API
  const mockUsers = [
    { id: '1', email: 'john@example.com', name: 'John Doe', role: 'user', isActive: true, joinedAt: '2024-01-15' },
    { id: '2', email: 'jane@example.com', name: 'Jane Smith', role: 'user', isActive: true, joinedAt: '2024-01-20' },
    { id: '3', email: 'bob@example.com', name: 'Bob Johnson', role: 'user', isActive: false, joinedAt: '2024-01-10' },
    { id: '4', email: 'alice@example.com', name: 'Alice Brown', role: 'user', isActive: true, joinedAt: '2024-01-25' },
  ];

  const getUserStats = (userName: string) => {
  const userOrders = orders.filter(order => order.userName === userName);
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    return {
      orders: userOrders.length,
      totalSpent,
    };
  };

  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.isActive).length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          User Management
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Monitor and manage all users on the platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {totalUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {activeUsers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {totalOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Package className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${totalRevenue.toFixed(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => {
              const stats = getUserStats(user.name);
              return (
                <div key={user.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {user.email} • Joined {new Date(user.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
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
                        ${stats.totalSpent.toFixed(0)}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Spent
                      </p>
                    </div>
                    <Badge className={user.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}>
                      {user.isActive ? 'Active' : 'Inactive'}
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
