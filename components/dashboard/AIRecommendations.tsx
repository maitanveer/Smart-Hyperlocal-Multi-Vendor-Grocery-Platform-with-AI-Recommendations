'use client';

import { Sparkles, Brain, ArrowRight } from 'lucide-react';
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

  const recommendedProducts = products.slice(0, 6);
  const avgSavings = Math.floor((savedAmount / goalAmount) * 100);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg shadow-sm">
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Recommendations
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                AI Powered
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Smart suggestions based on your shopping activity
            </p>
          </div>
        </div>
      </div>

      {/* AI Insight Box */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750 border-blue-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex-shrink-0">
              <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                ✨ AI-Powered Insight
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Based on your recent purchases and shopping patterns, we recommend fresh produce,
                organic dairy, and pantry essentials. You could save up to
                <span className="font-bold text-emerald-600 dark:text-emerald-400"> 18% </span>
                this week by bundling these items together!
              </p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-200 dark:border-gray-600">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-400">
                  💡 Tip: Combine items from different vendors for free delivery
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Progress */}
      <SavingsProgress saved={savedAmount} goal={goalAmount} />

      {/* Recommendation Cards Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recommended Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedProducts.map((product, idx) => (
            <RecommendationCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              vendor={product.vendorName}
              rating={4.2 + Math.random() * 0.8}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      {recommendedProducts.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-purple-600 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h3 className="font-semibold text-lg mb-2">Ready to save more?</h3>
            <p className="text-blue-100 text-sm mb-4">
              Add items from our AI recommendations to your cart and get exclusive deals. Free
              delivery on orders over $50!
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-md">
              Explore All Recommendations
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
