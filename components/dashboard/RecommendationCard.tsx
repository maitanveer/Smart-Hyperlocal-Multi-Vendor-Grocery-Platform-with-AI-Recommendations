'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RecommendationCardProps {
  id: string;
  name: string;
  price: number;
  vendor: string;
  image?: string;
  rating?: number;
  badge?: string;
  onAddToCart: () => void;
}

export function RecommendationCard({
  id,
  name,
  price,
  vendor,
  image,
  rating = 4.5,
  badge,
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
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 h-40">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl">🛒</div>
          </div>
        )}
        {badge && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Vendor */}
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          {vendor}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({rating})</span>
        </div>

        {/* Footer: Price and Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
