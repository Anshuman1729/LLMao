import { getCreator, getAudience, getRecommendedProducts } from '@/lib/api';
import { CreatorCard } from '@/components/ForYou/CreatorCard';
import { AudienceInsights } from '@/components/ForYou/AudienceInsights';
import { ProductGrid } from '@/components/ForYou/ProductGrid';

export default async function ForYouPage() {
  const [creator, audience, products] = await Promise.all([
    getCreator(),
    getAudience(),
    getRecommendedProducts('fashion', 'mid', '18-24'),
  ]);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-pink-100 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛍️</span>
          <span className="font-bold text-xl text-gray-800">Style Bazaar</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={creator.profile_pic}
            alt={creator.name}
            className="w-8 h-8 rounded-full border-2 border-pink-200"
          />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">{creator.name}</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* For You header */}
        <div>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            ✨ Personalized for you
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Your Style Bazaar</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Curated products, audience insights, and earning potential — all in one place.
          </p>
        </div>

        {/* Creator profile */}
        <section>
          <h2 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>👤</span> Your Profile
          </h2>
          <CreatorCard creator={creator} />
        </section>

        {/* Audience insights */}
        <section>
          <AudienceInsights audience={audience} />
        </section>

        {/* Product recommendations */}
        <section>
          <ProductGrid products={products} />
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Ready to start selling?</h3>
          <p className="text-pink-100 text-sm mb-4">
            Pick a product, create content about it, and start earning commissions today.
          </p>
          <button className="bg-white text-pink-600 font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-shadow">
            Browse All Products →
          </button>
        </section>
      </div>
    </main>
  );
}
