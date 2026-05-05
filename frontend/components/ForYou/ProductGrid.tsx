import { Product } from '@/lib/types';

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 group">
      <div className="relative overflow-hidden h-44 bg-gray-50">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x400/fce7f3/ec4899?text=${encodeURIComponent(product.name.slice(0, 10))}`;
          }}
        />
        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.match_score}% match
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{product.name}</h4>
        <p className="text-xs text-gray-500 mb-3">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-800">{product.price_range}</span>
          <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
            {product.commission_pct}% commission
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-400 leading-snug">{product.description}</p>
      </div>
    </div>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🛍️</span>
        <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
        <span className="text-xs text-gray-400 ml-auto">{products.length} products</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
