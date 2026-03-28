export type MerchProduct = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
  badge: string;
  category: 'clothing' | 'headwear' | 'creator-kit';
};

export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'closer-uniform-hoodie',
    name: 'Closer Uniform Hoodie',
    description: 'Heavyweight black hoodie with FSA ELITE chest mark and clean showroom fit.',
    priceCents: 7900,
    image: '/logo.png',
    badge: 'Top Seller',
    category: 'clothing',
  },
  {
    id: 'elite-cap-series',
    name: 'FSA ELITE Cap Series',
    description: 'Structured cap built for daily floor reps, calls, and creator content sessions.',
    priceCents: 4200,
    image: '/logo.png',
    badge: 'Daily Wear',
    category: 'headwear',
  },
  {
    id: 'self-promo-brand-kit',
    name: 'Self-Promo Brand Kit',
    description: 'Merch + creator assets bundle to level your personal sales brand presence.',
    priceCents: 11900,
    image: '/og-image.jpg',
    badge: 'Bundle',
    category: 'creator-kit',
  },
];
