'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function VendorProductsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const { products, deleteProduct } = useProduct();
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

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            My Products
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your product inventory
          </p>
        </div>
        <Link href="/dashboard/vendor/add-product">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {vendorProducts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              You haven't added any products yet.
            </p>
            <Link href="/dashboard/vendor/add-product">
              <Button>Add Your First Product</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {product.category} • ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Rating: {product.rating} • {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
