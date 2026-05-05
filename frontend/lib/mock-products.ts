export interface CategoryProduct {
  id: string;
  name: string;
  img: string;
  price: string;
  commission: number;
  benefits: string;
}

export interface Vibe {
  id: string;
  title: string;
  description: string;
  img: string;
}

export interface Reel {
  id: string;
  img: string;
  sold: string;
  label: string;
  priceText: string;
}

export const VIBES: Vibe[] = [
  {
    id: 'officewear-bags',
    title: 'Officewear bags',
    description: 'Make a collection of go-to office bags and share the link with your corporate girlies',
    img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=200&h=200&fit=crop',
  },
  {
    id: 'wedding-collection',
    title: 'Wedding collection',
    description: 'Make a collection of go-to office bags and share the link with your corporate girlies',
    img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
  },
  {
    id: 'makeup',
    title: 'Makeup',
    description: 'Put together your 5-min makeup kit & share it with your audience',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop',
  },
];

export const CATEGORY_FILTERS: string[] = [
  'officewear-bags',
  'jewelry',
  'makeup',
  'sneakers',
];

export const FILTER_LABELS: Record<string, string> = {
  'officewear-bags': 'Officewear bags',
  'jewelry': 'Jewelry',
  'makeup': 'Makeup',
  'sneakers': 'Sneakers',
};

export const CATEGORY_PRODUCTS: Record<string, CategoryProduct[]> = {
  'officewear-bags': [
    {
      id: 'ob1',
      name: 'Black Structured Tote',
      img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
      price: '₹345',
      commission: 10,
      benefits: 'Professional look, fits A4 documents, faux leather finish. Perfect for office commute and client meetings.',
    },
    {
      id: 'ob2',
      name: 'Brown Office Tote',
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      price: '₹280',
      commission: 10,
      benefits: 'Spacious interior with multiple pockets, genuine leather texture. Premium office essential under ₹300.',
    },
    {
      id: 'ob3',
      name: 'Black Work Backpack',
      img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      price: '₹345',
      commission: 10,
      benefits: 'Laptop compartment, ergonomic straps, water resistant. Ideal for daily commute. Very popular with WFH crowd.',
    },
    {
      id: 'ob4',
      name: 'Printed Satchel',
      img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=400&fit=crop',
      price: '₹345',
      commission: 10,
      benefits: 'Trending print, spacious main compartment, adjustable strap. Office meets street style.',
    },
    {
      id: 'ob5',
      name: 'Tan Tote Bag',
      img: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=400&fit=crop',
      price: '₹345',
      commission: 10,
      benefits: 'Classic tan color, open-top design, lightweight canvas. Versatile for work and weekends.',
    },
    {
      id: 'ob6',
      name: 'Brown Crossbody',
      img: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop',
      price: '₹280',
      commission: 10,
      benefits: 'Compact design, adjustable strap, zipped closure. Great for minimal office look.',
    },
  ],
  'jewelry': [
    {
      id: 'j1',
      name: 'Gold Hoop Earrings',
      img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      price: '₹249',
      commission: 10,
      benefits: 'Hypoallergenic gold plating, lightweight, suitable for daily wear and gifting.',
    },
    {
      id: 'j2',
      name: 'Pearl Drop Necklace',
      img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
      price: '₹299',
      commission: 10,
      benefits: 'Classic pearl design, sterling silver chain, perfect for office or events.',
    },
    {
      id: 'j3',
      name: 'Crystal Bracelet',
      img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
      price: '₹199',
      commission: 10,
      benefits: 'Adjustable size, crystal embellishments, elegant and affordable. Great content piece.',
    },
    {
      id: 'j4',
      name: 'Oxidised Silver Ring',
      img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      price: '₹149',
      commission: 10,
      benefits: 'Boho-style oxidised silver, adjustable band, pairs well with ethnic and western wear.',
    },
  ],
  'makeup': [
    {
      id: 'm1',
      name: 'Black Liquid Liner',
      img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
      price: '₹80',
      commission: 10,
      benefits: 'Under ₹100 & travel friendly. Longlasting liquid, stays longer during humid conditions. Precise tip for sharp wings. Great for daily wear content.',
    },
    {
      id: 'm2',
      name: 'Matte Lipstick Set',
      img: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2f40?w=400&h=400&fit=crop',
      price: '₹199',
      commission: 10,
      benefits: 'Long-wearing matte formula, moisturising ingredients, 6 pigmented shades. Perfect haul content.',
    },
    {
      id: 'm3',
      name: 'Pro Brush Set',
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
      price: '₹299',
      commission: 10,
      benefits: 'Professional-grade brushes, synthetic bristles, ergonomic handles. Complete 12-piece kit under ₹300.',
    },
    {
      id: 'm4',
      name: 'BB Cream SPF30',
      img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
      price: '₹250',
      commission: 10,
      benefits: 'Lightweight coverage, SPF30 protection, hydrating formula. Works for all skin tones. Great get-ready-with-me product.',
    },
  ],
  'sneakers': [
    {
      id: 's1',
      name: 'White Canvas Sneakers',
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      price: '₹599',
      commission: 10,
      benefits: 'Classic white canvas, rubber sole, unisex design. Versatile everyday wear — great OOTD content piece.',
    },
    {
      id: 's2',
      name: 'Pink Running Shoes',
      img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
      price: '₹799',
      commission: 10,
      benefits: 'Cushioned sole, breathable mesh upper. Perfect for gym and casual outings content.',
    },
    {
      id: 's3',
      name: 'Chunky Platform Sneakers',
      img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
      price: '₹699',
      commission: 10,
      benefits: 'Trendy chunky sole, height boost, pairs with dresses, jeans, or skirts. Trending aesthetic.',
    },
    {
      id: 's4',
      name: 'Black Sports Sneakers',
      img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
      price: '₹549',
      commission: 10,
      benefits: 'Sleek black design, non-slip sole. Suitable for gym or office casual Friday looks.',
    },
  ],
};

export const YOUR_PRODUCTS: CategoryProduct[] = [
  {
    id: 'yp1',
    name: 'Floral Anarkali Kurta',
    img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop',
    price: '₹300',
    commission: 0.5,
    benefits: 'Trending ethnic wear loved by fashion creators. Easy to style for content.',
  },
  {
    id: 'yp2',
    name: 'Crystal Champagne Flutes',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    price: '₹300',
    commission: 0.5,
    benefits: 'Premium look at budget price. Great for celebrations and gifting content.',
  },
  {
    id: 'yp3',
    name: 'Gold Drop Earrings',
    img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop',
    price: '₹300',
    commission: 0.5,
    benefits: 'Statement earrings with wide audience appeal. Trending in reels.',
  },
  {
    id: 'yp4',
    name: 'Embroidered Dupatta',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    price: '₹300',
    commission: 0.5,
    benefits: 'High-margin accessory with wide audience appeal.',
  },
  {
    id: 'yp5',
    name: 'Casual Palazzo Set',
    img: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=400&h=400&fit=crop',
    price: '₹300',
    commission: 0.5,
    benefits: 'Comfort-first fashion that sells year-round.',
  },
  {
    id: 'yp6',
    name: 'Vitamin C Serum',
    img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    price: '₹300',
    commission: 0.5,
    benefits: 'Top-selling skincare with high repeat purchase rate.',
  },
];

export const BEST_SELLING_REELS: Reel[] = [
  {
    id: 'r1',
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=500&fit=crop',
    sold: '10K',
    label: 'Meesho Finds',
    priceText: 'Under ₹150/-',
  },
  {
    id: 'r2',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=500&fit=crop',
    sold: '10K',
    label: 'Meesho Finds',
    priceText: 'Under ₹200/-',
  },
  {
    id: 'r3',
    img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=500&fit=crop',
    sold: '8K',
    label: 'Meesho Finds',
    priceText: 'Under ₹299/-',
  },
];

export function getProductById(id: string): CategoryProduct | undefined {
  for (const products of Object.values(CATEGORY_PRODUCTS)) {
    const found = products.find((p) => p.id === id);
    if (found) return found;
  }
  return YOUR_PRODUCTS.find((p) => p.id === id);
}
