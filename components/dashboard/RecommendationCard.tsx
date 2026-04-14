'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Star, Zap } from 'lucide-react';

interface RecommendationCardProps {
  name: string;
  price: number;
  vendor: string;
  image?: string;
  rating?: number;
  badge?: string;
  savings?: number;
  onAddToCart: () => void;
}

export function RecommendationCard({
  name,
  price,
  vendor,
  image,
  rating = 4.5,
  badge,
  savings,
  onAddToCart,
}: RecommendationCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      onAddToCart();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm dark:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl dark:hover:shadow-xl hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 dark:from-gray-700 dark:to-gray-600 h-40">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl opacity-40">🥕</div>
          </div>
        )}
        
        {/* Badge Section */}
        <div className="absolute inset-0 flex items-start justify-between p-3 pointer-events-none">
          {badge && (
            <div className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
              {badge}
            </div>
          )}
          {savings && (
            <div className="flex items-center gap-1 px-2 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-md">
              <Zap className="h-3 w-3" />
              Save {savings}%
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Vendor */}
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {vendor}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">({rating.toFixed(1)})</span>
        </div>

        {/* Footer: Price and Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ${price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            aria-label="Add to cart"
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
