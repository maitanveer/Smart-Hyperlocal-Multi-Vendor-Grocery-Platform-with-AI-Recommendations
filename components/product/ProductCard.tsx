'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useCart } from '@/context/CartContext';
import { Product } from '@/context/ProductContext';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      vendorId: product.vendorId,
      vendorName: product.vendorName,
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold">Out of Stock</span>
              </div>
            )}
          </div>
        </Link>

        <div className="space-y-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            by {product.vendorName}
          </p>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {product.rating}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className="flex items-center gap-1"
            >
              <ShoppingCart className="h-4 w-4" />
              {isAdding ? 'Added!' : 'Add'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
