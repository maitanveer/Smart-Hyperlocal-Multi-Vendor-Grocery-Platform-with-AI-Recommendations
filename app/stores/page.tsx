'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useProduct } from '@/context/ProductContext';
import { MapPin, Star, ShoppingBag } from 'lucide-react';

export default function StoresPage() {
  const { vendors } = useProduct();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Nearby Stores
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Discover fresh groceries from trusted local vendors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{vendor.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {vendor.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{vendor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <ShoppingBag className="h-4 w-4" />
                    <span>{vendor.products.length} products available</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {vendor.products.slice(0, 3).map((product) => (
                      <span
                        key={product.id}
                        className="inline-block bg-slate-100 dark:bg-slate-800 text-xs px-2 py-1 rounded-full"
                      >
                        {product.category}
                      </span>
                    ))}
                    {vendor.products.length > 3 && (
                      <span className="inline-block bg-slate-100 dark:bg-slate-800 text-xs px-2 py-1 rounded-full">
                        +{vendor.products.length - 3} more
                      </span>
                    )}
                  </div>

                  <Link href={`/stores/${vendor.id}`}>
                    <Button className="w-full">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="secondary">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
