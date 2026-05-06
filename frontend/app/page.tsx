import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 px-6 py-5 flex items-center gap-2">
        <span className="text-xl">🛍️</span>
        <span className="font-bold text-gray-800">Style Bazaar</span>
        <span className="text-xs text-gray-400 border border-gray-200 rounded-full px-2 py-0.5 ml-1">by Meesho</span>
      </header>

      {/* Welcome content */}
      <div className="flex flex-col items-center gap-6 px-8 pt-16 pb-8 max-w-sm w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Great you&apos;re here!! 🎉
        </h1>
        <p className="text-gray-400 text-sm">
          Let&apos;s find you the perfect products to sell on Meesho.
        </p>
      </div>

      {/* Bestie mascot — large, centered */}
      <div className="flex items-center justify-center my-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://i.postimg.cc/htcKxjYt/image.png"
          alt="Your bestie"
          className="w-48 h-48 object-contain"
        />
      </div>

      {/* Meet your bestie card */}
      <div className="mx-6 w-full max-w-sm">
        <Link href="/onboarding">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex items-center gap-4 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.postimg.cc/htcKxjYt/image.png"
                alt="Your bestie"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900 text-sm">Meet your bestie</p>
              <p className="text-gray-400 text-xs mt-0.5">
                Let&apos;s get you started with Meesho creator commerce →
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-center gap-8">
        {[
          { n: '50K+', l: 'Creators' },
          { n: '₹2.3Cr', l: 'Earned' },
          { n: '4.8★', l: 'Rating' },
        ].map(({ n, l }) => (
          <div key={l} className="text-center">
            <p className="text-base font-bold text-gray-800">{n}</p>
            <p className="text-xs text-gray-400">{l}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
