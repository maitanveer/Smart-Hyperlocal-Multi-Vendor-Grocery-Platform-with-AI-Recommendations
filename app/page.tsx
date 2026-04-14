'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
  BarChart3,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Check,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
    title: 'AI-Powered Recommendations',
    description:
      'Smart suggestions based on your shopping habits and preferences',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
    title: 'Hyperlocal Delivery',
    description: 'Fresh groceries from nearby stores delivered to your doorstep',
  },
  {
    icon: <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
    title: 'Multi-Vendor Marketplace',
    description: 'Shop from multiple trusted local vendors in one place',
  },
  {
    icon: <Zap className="h-8 w-8 text-amber-600 dark:text-amber-400" />,
    title: 'Real-Time Updates',
    description: 'Track your orders and get instant notifications',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for new projects',
    features: [
      'Up to 10,000 events/month',
      'Basic analytics',
      'Email support',
      '15-day data retention',
    ],
  },
  {
    name: 'Professional',
    price: 99,
    description: 'For growing teams',
    popular: true,
    features: [
      'Up to 1M events/month',
      'Advanced analytics',
      'Priority support',
      '90-day data retention',
      'Custom integrations',
      'Team collaboration',
    ],
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'For large organizations',
    features: [
      'Unlimited events',
      'Custom analytics',
      '24/7 phone support',
      'Unlimited data retention',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom integrations',
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
          <div className="absolute top-0 right-0 h-96 w-96 bg-gradient-to-bl from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 bg-gradient-to-tr from-emerald-200/30 to-indigo-200/30 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-block rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-3 mb-8 border border-indigo-200/50">
            <p className="text-sm font-semibold text-indigo-700">
               AI-powered grocery shopping made simple
            </p>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-8 leading-[0.9]">
            Fresh groceries, <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              smarter shopping
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Discover fresh local groceries with AI-powered recommendations.
            Shop from multiple vendors, get hyperlocal delivery, and enjoy personalized suggestions that save you time and money.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="flex items-center gap-3 px-8 py-7 text-lg font-semibold whitespace-nowrap bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <a href="#pricing">
              <Button variant="secondary" size="lg" className="px-8 py-7 text-lg font-semibold border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
                View Pricing
              </Button>
            </a>
          </div>

          {/* Hero Grocery Preview */}
          <div className="rounded-[2rem] border border-gray-200 bg-white/90 shadow-2xl shadow-gray-200/50 overflow-hidden">
            <div className="aspect-video p-6 sm:p-8 grid gap-6 bg-gradient-to-br from-slate-100 to-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    AI Recommendations
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                    Fresh produce basket
                  </h3>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Organic
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Bananas
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    $2.99
                  </p>
                  <p className="text-sm text-slate-500">
                    Fresh Farms
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Milk
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    $3.49
                  </p>
                  <p className="text-sm text-slate-500">
                    Dairy Delight
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Bread
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    $2.49
                  </p>
                  <p className="text-sm text-slate-500">
                    Fresh Farms
                  </p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span>Weekly savings</span>
                  <span className="font-semibold text-slate-900">$24.50</span>
                </div>
                <div className="grid grid-cols-12 gap-2 h-24">
                  <div className="col-span-2 rounded-full bg-green-600" />
                  <div className="col-span-3 rounded-full bg-green-300" />
                  <div className="col-span-2 rounded-full bg-slate-300" />
                  <div className="col-span-3 rounded-full bg-slate-200" />
                  <div className="col-span-2 rounded-full bg-slate-100" />
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-blue-100 p-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <p>
                  Smart recommendations and hyperlocal delivery for the modern shopper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to transform your grocery shopping experience with AI-powered insights and seamless delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your grocery shopping needs. Start free and upgrade as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm ${
                  plan.popular ? 'ring-2 ring-indigo-600 scale-105 shadow-indigo-200/50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardContent className="pt-8 pb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>

                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className={`w-full mb-8 font-semibold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg'
                        : 'border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    Get Started
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 rounded-3xl p-12 sm:p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to shop smarter?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of customers discovering fresh groceries with AI recommendations and hyperlocal delivery
            </p>
            <Link href="/stores">
              <Button variant="secondary" size="lg" className="bg-white text-indigo-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Browse Stores <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                GroceryHub
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Smart hyperlocal grocery platform powered by AI for the modern shopper
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#features" className="hover:text-indigo-600 transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-indigo-600 transition-colors duration-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
            <p>&copy; 2024 GroceryHub. All rights reserved.</p>
            <div className="flex gap-8 mt-4 sm:mt-0">
              <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                Twitter
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                GitHub
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
