'use client';

import { useEffect, useState } from 'react';
import { getCreator } from '@/lib/api';
import { Creator } from '@/lib/types';
import { VoiceBotWidget } from '@/components/VoiceBot/VoiceBotWidget';
import { Spinner } from '@/components/ui/Spinner';

export default function OnboardingPage() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCreator()
      .then(setCreator)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center gap-3">
        <span className="text-2xl">🛍️</span>
        <span className="font-bold text-xl text-gray-800">Style Bazaar</span>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Spinner size="lg" />
              <p className="text-gray-400 text-sm">Setting up your profile...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-8">
                {['Welcome', 'Audience', 'Budget', 'Products'].map((label, i) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-pink-500' : 'bg-pink-200'}`} />
                    <span className="text-[10px] text-gray-400">{label}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Hi {creator?.name?.split(' ')[0] ?? 'there'}! 👋
                </h1>
                <p className="text-gray-500 text-sm">
                  Ritu will help you find the perfect products for your{' '}
                  <span className="font-medium text-pink-600">{creator?.niche ?? 'content'}</span> audience
                </p>
              </div>

              <VoiceBotWidget
                niche={creator?.niche ?? 'fashion'}
                mode="onboarding"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
