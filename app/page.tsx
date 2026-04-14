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
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: 'AI-Powered Recommendations',
    description:
      'Smart suggestions based on your shopping habits and preferences',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-green-600" />,
    title: 'Hyperlocal Delivery',
    description: 'Fresh groceries from nearby stores delivered to your doorstep',
  },
  {
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    title: 'Multi-Vendor Marketplace',
    description: 'Shop from multiple trusted local vendors in one place',
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-600" />,
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
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/3 h-72 w-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute top-1/2 right-1/3 h-72 w-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute bottom-1/3 left-1/2 h-72 w-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          {/* <div className="inline-block rounded-full bg-blue-50 px-4 py-2 mb-6">
            <p className="text-sm font-medium text-blue-600">
              🚀 The next generation of analytics is here
            </p>
          </div> */}

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            Fresh groceries, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              smarter shopping
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Discover fresh local groceries with AI-powered recommendations.
            Shop from multiple vendors, get hyperlocal delivery, and enjoy personalized suggestions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">

  <Link href="/dashboard">
    <Button
      size="lg"
      className="flex items-center gap-2 px-6 py-6 whitespace-nowrap"
    >
      Get Started Free
      <ArrowRight className="h-5 w-5" />
    </Button>
  </Link>

  <a href="#pricing">
    <Button variant="secondary" size="lg">
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
                <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-800/90">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Bread
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                    $2.49
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Fresh Farms
                  </p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-50 p-4 dark:bg-slate-950/80">
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span>Weekly savings</span>
                  <span className="font-semibold text-slate-900 dark:text-white">$24.50</span>
                </div>
                <div className="grid grid-cols-12 gap-2 h-24">
                  <div className="col-span-2 rounded-full bg-green-600 dark:bg-green-500" />
                  <div className="col-span-3 rounded-full bg-green-300 dark:bg-green-400" />
                  <div className="col-span-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <div className="col-span-3 rounded-full bg-slate-200 dark:bg-slate-700/80" />
                  <div className="col-span-2 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-900/70">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-200" />
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
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to transform data into actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the perfect plan for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''}
              >
                <CardContent className="pt-6">
                  {plan.popular && (
                    <div className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>

                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className="w-full mb-6"
                  >
                    Get Started
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to shop smarter?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of customers discovering fresh groceries with AI recommendations
          </p>
          <Link href="/stores">
            <Button variant="secondary" size="lg">
              Browse Stores <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                GroceryHub
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Smart hyperlocal grocery platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 SaaS Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Twitter
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                GitHub
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
