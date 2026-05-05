import { InstagramConnect } from '@/components/InstagramConnect';
import { VoiceBotWidget } from '@/components/VoiceBot/VoiceBotWidget';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛍️</span>
          <span className="font-bold text-xl text-gray-800">Style Bazaar</span>
        </div>
        <span className="text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1">by Meesho</span>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-12 max-w-6xl mx-auto w-full">
        {/* Left: copy */}
        <div className="flex-1 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            ✨ Personalized for creators
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
            Find products your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">audience will love</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Connect your Instagram and let Ritu, your AI style guide, curate the perfect Meesho products for your niche — in minutes, not hours.
          </p>

          <div className="flex flex-col gap-4">
            <InstagramConnect />
            <p className="text-xs text-center text-gray-400">
              No posting required • 100% free • Takes 2 minutes
            </p>
          </div>

          {/* Social proof */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { label: '50K+', sub: 'Creators onboarded' },
              { label: '₹2.3Cr', sub: 'Commission earned' },
              { label: '4.8★', sub: 'Creator rating' },
            ].map(({ label, sub }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-bold text-gray-800">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Ritu preview bot */}
        <div className="flex-shrink-0 w-full max-w-sm">
          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-pink-50">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-gray-500">Ritu is online</span>
            </div>
            <VoiceBotWidget mode="greeting" niche="fashion" />
            <div className="mt-5 pt-4 border-t border-pink-50 text-center">
              <InstagramConnect />
            </div>
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div className="bg-white border-t border-pink-100 px-6 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { emoji: '🎙️', title: 'Voice-first onboarding', desc: 'Ritu guides you through product selection via natural voice conversation' },
            { emoji: '📊', title: 'Audience insights', desc: 'See who your potential buyers are — age, gender, location & more' },
            { emoji: '💰', title: 'High-commission picks', desc: 'Products curated to your niche with up to 25% commission rates' },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="flex gap-4 items-start">
              <span className="text-3xl">{emoji}</span>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
