'use client';

import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { RecommendationCard } from './RecommendationCard';
import { SavingsProgress } from './SavingsProgress';
import type { Product } from '@/context/ProductContext';

interface AIRecommendationsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  savedAmount?: number;
  goalAmount?: number;
}

export function AIRecommendations({
  products,
  onAddToCart,
  savedAmount = 24.5,
  goalAmount = 50,
}: AIRecommendationsProps) {
  if (products.length === 0) {
    return null;
  }

  // Calculate potential savings based on products
  const avgSavings = products.length > 0 ? (products.length * 2.5) : 0;
  const recommendedProducts = products.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Recommendations</h2>
            <p className="text-sm text-gray-600">
              Personalized suggestions based on your shopping habits
            </p>
          </div>
        </div>
      </div>

      {/* AI Insight Box */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
        <CardContent className="p-6">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white rounded-lg">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                ✨ Smart Insight
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Based on your recent purchases and shopping patterns, we recommend adding fresh
                produce, organic dairy, and pantry essentials to your cart. You could save up to
                <span className="font-bold text-emerald-600"> 18% </span>
                this week by bundling these items!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Progress */}
      <SavingsProgress saved={savedAmount} goal={goalAmount} />

      {/* Recommendation Cards Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recommended Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <RecommendationCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              vendor={product.vendor}
              rating={4.5}
              badge={product.discount ? `${product.discount}% OFF` : undefined}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      {recommendedProducts.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-2">Ready to save?</h3>
          <p className="text-sm text-blue-100 mb-4">
            Add items from our AI recommendations to your cart and get exclusive deals
          </p>
          <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            View All Recommendations
          </button>
        </div>
      )}
    </div>
  );
}
