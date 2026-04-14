'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function VendorOrdersPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { orders } = useProduct();
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

  const vendorOrders = orders.filter(order =>
    order.vendorId === user.email
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'preparing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          My Orders
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage customer orders for your products
        </p>
      </div>

      {vendorOrders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">
              No orders yet. Orders will appear here when customers purchase your products.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {vendorOrders.map((order) => {
            const vendorTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                        Customer: {order.userName}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Email: {order.userId}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                        Your Items:
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex justify-between items-center text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Your Total:</span>
                          <span>${vendorTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        Update Status
                      </Button>
                      <Button variant="secondary" size="sm">
                        Contact Customer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
