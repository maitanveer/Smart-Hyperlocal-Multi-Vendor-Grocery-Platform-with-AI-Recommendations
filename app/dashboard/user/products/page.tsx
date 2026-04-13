'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';

export default function UserProductsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { products, getRecommendations } = useProduct();
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

  const recommendedProducts = getRecommendations(user.email);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Browse Products
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Discover fresh groceries from local vendors
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/user/cart">
            <Button variant="secondary">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Cart
            </Button>
          </Link>
          <Link href="/dashboard/user/orders">
            <Button variant="secondary">
              <Heart className="h-4 w-4 mr-2" />
              Orders
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recommendedProducts.length > 0 ? (
              <ProductGrid products={recommendedProducts} />
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                Complete some orders to get personalized recommendations!
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductGrid products={products} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
