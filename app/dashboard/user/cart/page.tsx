'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CartItem } from '@/components/cart/CartItem';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function UserCartPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { cart, getTotal, clearCart } = useCart();
  const { placeOrder } = useProduct();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user?.role !== 'user') {
        router.replace('/dashboard');
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || user?.role !== 'user') {
    return null;
  }

  const total = getTotal();
  const deliveryFee = total > 50 ? 0 : 5.99;
  const finalTotal = total + deliveryFee;

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    // placeOrder(user.email, cart, finalTotal);
    placeOrder({
  userId: user.email, // or user.id if available
  userName: user.name || "User",
  vendorId: cart[0]?.vendorId || "unknown",
  vendorName: cart[0]?.vendorName || "unknown",
  items: cart.map(item => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity
  })),
  total: finalTotal,
  status: "pending"
});
    clearCart();
    router.push('/dashboard/user/orders');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/user/products">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Review your items and checkout
          </p>
        </div>
      </div>

      {cart.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <ShoppingBag className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Add some delicious groceries to get started!
            </p>
            <Link href="/dashboard/user/products">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Free delivery on orders over $50!
                  </p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full"
                  size="lg"
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  Delivery Address
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  123 Main Street<br />
                  Springfield, IL 62701
                </p>
                <Button variant="secondary" size="sm" className="mt-3">
                  Change Address
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
