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
  demand?: number;
  contentAvailable?: number;
}

export interface Reel {
  id: string;
  img: string;
  sold: string;
  label: string;
  priceText: string;
}

// ── Fashion ─────────────────────────────────────────────────────────────────

export const VIBES: Vibe[] = [
  {
    id: 'officewear-bags',
    title: 'Officewear bags',
    description: 'Make a collection of go-to office bags and share the link with your corporate girlies',
    img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=200&h=200&fit=crop',
    demand: 4,
    contentAvailable: 3,
  },
  {
    id: 'wedding-collection',
    title: 'Oxidised Jewellery',
    description: 'Curate a stunning oxidised jewellery collection your audience will love to wear and gift',
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop',
    demand: 5,
    contentAvailable: 3,
  },
  {
    id: 'makeup',
    title: 'Festive Dupattas',
    description: 'Put together a festive dupatta collection & share it with your audience',
    img: 'https://i.postimg.cc/T30fcx8G/images.jpg',
    demand: 4,
    contentAvailable: 4,
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

// ── Home Decor ───────────────────────────────────────────────────────────────

export const HOME_DECOR_VIBES: Vibe[] = [
  {
    id: 'bedside-musts',
    title: 'Bed-side musts',
    description: 'Cosy bedside essentials your followers will love — lamps, organizers, and more',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=200&fit=crop',
    demand: 3,
    contentAvailable: 4,
  },
  {
    id: 'quirky-wall-decor',
    title: 'Quirky wall-decor',
    description: 'Statement wall pieces that make any room look 10x better — easy to style for a reel',
    img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop',
    demand: 5,
    contentAvailable: 3,
  },
  {
    id: 'affordable-home-decor',
    title: 'Affordable home-decor',
    description: 'Put together your budget home makeover collection & share it with your audience',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
    demand: 4,
    contentAvailable: 4,
  },
];

export const HOME_DECOR_CATEGORY_FILTERS: string[] = [
  'wall-decor',
  'bed-side',
  'floor-decor',
  'artificial-plants',
];

export const HOME_DECOR_FILTER_LABELS: Record<string, string> = {
  'wall-decor': 'Wall decor',
  'bed-side': 'Bed-side',
  'floor-decor': 'Floor-decor',
  'artificial-plants': 'Artificial Plants',
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

export const HOME_DECOR_CATEGORY_PRODUCTS: Record<string, CategoryProduct[]> = {
  'wall-decor': [
    {
      id: 'wd1',
      name: 'Hanging Shelf with Plant Hook',
      img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&h=400&fit=crop',
      price: '₹345',
      commission: 10,
      benefits: 'Wooden hanging shelf with rope, holds small plants and decor. Easy to install, no drilling required.',
    },
    {
      id: 'wd2',
      name: 'Woven Bamboo Wall Art',
      img: 'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=400&h=400&fit=crop',
      price: '₹280',
      commission: 10,
      benefits: 'Handwoven bamboo rounds, Boho aesthetic, set of 3 sizes. Huge trend on home decor reels.',
    },
    {
      id: 'wd3',
      name: 'Floating Wall Shelf Set',
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
      price: '₹345',
      commission: 10,
      benefits: 'Set of 3 wooden floating shelves, holds books and plants. Easy before/after reel content.',
    },
    {
      id: 'wd4',
      name: 'Round Decorative Wall Art',
      img: 'https://images.unsplash.com/photo-1582582494705-f8ce0f0b3f71?w=400&h=400&fit=crop',
      price: '₹345',
      commission: 10,
      benefits: 'Intricate resin or MDF wall art, adds a cultural touch. Popular for pooja room and living room.',
    },
    {
      id: 'wd5',
      name: 'Macramé Wall Hanging',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      price: '₹299',
      commission: 10,
      benefits: 'Handmade cotton macramé, boho-chic design. Trending in aesthetic home decor reels.',
    },
    {
      id: 'wd6',
      name: 'Metal Geometric Wall Frame',
      img: 'https://images.unsplash.com/photo-1604162977626-64d7b866fb96?w=400&h=400&fit=crop',
      price: '₹399',
      commission: 10,
      benefits: 'Gold-finish geometric frame, can hold photos or stand alone. Minimal and elegant look.',
    },
  ],
  'bed-side': [
    {
      id: 'bs1',
      name: 'Wooden Bedside Organizer',
      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop',
      price: '₹349',
      commission: 10,
      benefits: 'Holds phone, glasses, remotes. Solid wood, anti-slip base. Great gifting and unboxing content.',
    },
    {
      id: 'bs2',
      name: 'Soft Glow Bedside Lamp',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      price: '₹450',
      commission: 10,
      benefits: 'Warm 3000K light, touch dimmer, USB port in base. Instantly makes any room look aesthetic.',
    },
    {
      id: 'bs3',
      name: 'Fluffy Throw Pillow Set',
      img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
      price: '₹299',
      commission: 10,
      benefits: 'Set of 2 faux fur cushions, 16 colors. Instantly upgrades bed or sofa. High visual impact on video.',
    },
    {
      id: 'bs4',
      name: 'Knit Throw Blanket',
      img: 'https://images.unsplash.com/photo-1543248939-ff40856f65d4?w=400&h=400&fit=crop',
      price: '₹380',
      commission: 10,
      benefits: 'Chunky knit acrylic, large 150x200cm size. Cosy aesthetic — perfect for winter room tour reels.',
    },
  ],
  'floor-decor': [
    {
      id: 'fd1',
      name: 'Tall Floor Vase',
      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      price: '₹499',
      commission: 10,
      benefits: 'Minimalist ceramic tall vase, 60cm height. Looks luxe but budget-friendly. Strong visual anchor.',
    },
    {
      id: 'fd2',
      name: 'Wicker Plant Stand',
      img: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop',
      price: '₹349',
      commission: 10,
      benefits: '3-tier bamboo plant stand, holds 3 pots. Perfect for balcony garden and living room corner.',
    },
    {
      id: 'fd3',
      name: 'Jute Round Rug',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      price: '₹450',
      commission: 10,
      benefits: 'Natural jute, 3ft diameter. Instantly transforms bare floors. Trending boho aesthetic.',
    },
    {
      id: 'fd4',
      name: 'Decorative Storage Basket',
      img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&h=400&fit=crop',
      price: '₹299',
      commission: 10,
      benefits: 'Hand-woven seagrass basket, multipurpose storage. Organise + decorate at the same time.',
    },
  ],
  'artificial-plants': [
    {
      id: 'ap1',
      name: 'Artificial Monstera Plant',
      img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&h=400&fit=crop',
      price: '₹349',
      commission: 10,
      benefits: '90cm tall, realistic leaves, weighted pot. Zero maintenance. Great for room transformation reels.',
    },
    {
      id: 'ap2',
      name: 'Succulent Arrangement Set',
      img: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=400&fit=crop',
      price: '₹249',
      commission: 10,
      benefits: 'Set of 6 mini succulents in ceramic pots. Shelf and windowsill decor. Budget-friendly haul content.',
    },
    {
      id: 'ap3',
      name: 'Hanging Ivy Basket',
      img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
      price: '₹299',
      commission: 10,
      benefits: 'Trailing artificial ivy in woven hanging pot. Balcony or bedroom corner essential.',
    },
    {
      id: 'ap4',
      name: 'Cactus Cluster Pot',
      img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
      price: '₹199',
      commission: 10,
      benefits: 'Multi-cactus arrangement in terracotta pot. Minimal and modern desk or shelf decor.',
    },
  ],
};

export const HOME_DECOR_YOUR_PRODUCTS: CategoryProduct[] = [
  {
    id: 'hdyp1',
    name: 'Cleaning Spray Kit',
    img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop',
    price: '₹149',
    commission: 0.5,
    benefits: 'Multi-surface cleaning spray, eco-friendly formula. Top seller in home cleaning category.',
  },
  {
    id: 'hdyp2',
    name: 'Brass Diya Set',
    img: 'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c?w=400&h=400&fit=crop',
    price: '₹199',
    commission: 0.5,
    benefits: 'Traditional brass diyas, set of 5. Perfect for pooja and festival decor content.',
  },
  {
    id: 'hdyp3',
    name: 'Storage Box Set',
    img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&h=400&fit=crop',
    price: '₹249',
    commission: 0.5,
    benefits: 'Set of 3 stackable storage boxes. Great before/after organisation content.',
  },
  {
    id: 'hdyp4',
    name: 'Incense Holder Stand',
    img: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=400&h=400&fit=crop',
    price: '₹99',
    commission: 0.5,
    benefits: 'Wooden incense stick holder with ash catcher. Pooja room essential.',
  },
  {
    id: 'hdyp5',
    name: 'Wall Cleaning Brush Set',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    price: '₹179',
    commission: 0.5,
    benefits: 'Long handle brush set for tiles, corners, and hard-to-reach areas.',
  },
  {
    id: 'hdyp6',
    name: 'Hanging Planter Set',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    price: '₹199',
    commission: 0.5,
    benefits: 'Macramé hanging planters, set of 2. Trending balcony and window decor.',
  },
];

// ── Niche-aware accessors ────────────────────────────────────────────────────

export function getVibesForNiche(niche: string): Vibe[] {
  if (niche === 'home') return HOME_DECOR_VIBES;
  return VIBES;
}

export function getCategoryFiltersForNiche(niche: string): string[] {
  if (niche === 'home') return HOME_DECOR_CATEGORY_FILTERS;
  return CATEGORY_FILTERS;
}

export function getFilterLabelsForNiche(niche: string): Record<string, string> {
  if (niche === 'home') return HOME_DECOR_FILTER_LABELS;
  return FILTER_LABELS;
}

export function getCategoryProductsForNiche(niche: string): Record<string, CategoryProduct[]> {
  if (niche === 'home') return HOME_DECOR_CATEGORY_PRODUCTS;
  return CATEGORY_PRODUCTS;
}

export function getYourProductsForNiche(niche: string): CategoryProduct[] {
  if (niche === 'home') return HOME_DECOR_YOUR_PRODUCTS;
  return YOUR_PRODUCTS;
}

export const YOUR_PRODUCTS: CategoryProduct[] = [
  {
    id: 'yp1',
    name: 'Floral Anarkali Kurta',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
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
  for (const products of Object.values(HOME_DECOR_CATEGORY_PRODUCTS)) {
    const found = products.find((p) => p.id === id);
    if (found) return found;
  }
  return (
    YOUR_PRODUCTS.find((p) => p.id === id) ??
    HOME_DECOR_YOUR_PRODUCTS.find((p) => p.id === id)
  );
}
