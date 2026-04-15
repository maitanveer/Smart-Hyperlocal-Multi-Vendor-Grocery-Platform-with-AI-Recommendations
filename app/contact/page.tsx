'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Mail, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [planDetails, setPlanDetails] = useState<{ plan: string; price: string } | null>(null);

  useEffect(() => {
    const plan = searchParams.get('plan');
    const price = searchParams.get('price');

    if (plan && price) {
      setPlanDetails({ plan, price });
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Contact Our Sales Team
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to take your business to the next level? Our enterprise solutions are customized for your specific needs.
            </p>

            {planDetails && (
              <div className="mt-6 inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                Interested in: {planDetails.plan.charAt(0).toUpperCase() + planDetails.plan.slice(1)} Plan (${planDetails.price}/month)
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-indigo-600" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Speak directly with our sales team</p>
                  <p className="text-2xl font-bold text-gray-900">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri 9AM-6PM EST</p>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-indigo-600" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Get a response within 24 hours</p>
                  <p className="text-lg font-medium text-gray-900">enterprise@groceryhub.com</p>
                  <p className="text-sm text-gray-500 mt-1">We love hearing from you!</p>
                </CardContent>
              </Card>

              <Card className="shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Why Choose Enterprise?</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Unlimited events and data retention</li>
                    <li>✓ 24/7 dedicated support</li>
                    <li>✓ Custom integrations and features</li>
                    <li>✓ SLA guarantees and priority handling</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}