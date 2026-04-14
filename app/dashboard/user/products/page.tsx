'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProduct, type Product } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AIRecommendations } from '@/components/dashboard/AIRecommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';

export default function UserProductsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { products, getRecommendations } = useProduct();
  const { addToCart } = useCart();
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

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || '',
      vendorId: product.vendorId,
      vendorName: product.vendorName,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Browse Products
          </h1>
          <p className="text-slate-600 mt-2">
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
        {/* AI Recommendations Section */}
        {recommendedProducts.length > 0 && (
          <AIRecommendations
            products={recommendedProducts}
            onAddToCart={handleAddToCart}
            savedAmount={24.5}
            goalAmount={50}
          />
        )}

        {/* All Products Section */}
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
