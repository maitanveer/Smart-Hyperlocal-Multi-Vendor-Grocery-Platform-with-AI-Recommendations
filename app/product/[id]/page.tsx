'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useProduct } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { Star, MapPin, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { products } = useProduct();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Product not found
          </h1>
          <Link href="/stores">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Stores
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      vendorId: product.vendorId,
      vendorName: product.vendorName,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Link href="/stores" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Stores
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600 dark:text-slate-400">
                {product.vendorName} • {product.location}
              </span>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>

            <div className="text-4xl font-bold text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Link href="/dashboard/user/cart">
                <Button variant="secondary">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Link href={`/product/${relatedProduct.id}`}>
                      <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => {
                        addToCart({
                          id: `${relatedProduct.id}-${Date.now()}`,
                          productId: relatedProduct.id,
                          name: relatedProduct.name,
                          price: relatedProduct.price,
                          image: relatedProduct.image,
                          vendorId: relatedProduct.vendorId,
                          vendorName: relatedProduct.vendorName,
                        });
                      }}
                      className="w-full"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
