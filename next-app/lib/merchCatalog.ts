export type MerchProduct = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image: string;
  badge: string;
  category: 'clothing' | 'headwear' | 'creator-kit' | 'business-cards';
  shortLabel: string;
  bestFor: string;
  leadTime: string;
  featureList: string[];
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
    shortLabel: 'Signature Layer',
    bestFor: 'Floor reps who want a cleaner off-the-clock and on-camera presence.',
    leadTime: 'Ships after payment confirmation.',
    featureList: ['Heavyweight feel', 'Clean black finish', 'Built for daily wear'],
  },
  {
    id: 'elite-cap-series',
    name: 'FSA ELITE Cap Series',
    description: 'Structured cap built for daily floor reps, calls, and creator content sessions.',
    priceCents: 4200,
    image: '/logo.png',
    badge: 'Daily Wear',
    category: 'headwear',
    shortLabel: 'Identity Piece',
    bestFor: 'Reps building a recognizable everyday look across showroom and social content.',
    leadTime: 'Ships after payment confirmation.',
    featureList: ['Structured profile', 'Creator-friendly look', 'Easy daily rotation'],
  },
  {
    id: 'self-promo-brand-kit',
    name: 'Self-Promo Brand Kit',
    description: 'Merch + creator assets bundle to level your personal sales brand presence.',
    priceCents: 11900,
    image: '/og-image.jpg',
    badge: 'Bundle',
    category: 'creator-kit',
    shortLabel: 'Closer Stack',
    bestFor: 'Members who want gear plus branding assets that make them look established fast.',
    leadTime: 'Digital and merch bundle timing varies by item.',
    featureList: ['Brand-forward bundle', 'Higher-status positioning', 'Built for self-promo'],
  },
  {
    id: 'premium-business-cards',
    name: 'Premium Business Cards (250 ct)',
    description: 'Thick-stock matte cards with your name, logo, QR code, and FSA ELITE branding ready to hand out.',
    priceCents: 4900,
    image: '/logo-badge.jpg',
    badge: 'Essential',
    category: 'business-cards',
    shortLabel: 'Closer Essential',
    bestFor: 'Reps who need a sharper first impression in person.',
    leadTime: 'Production timing applies before fulfillment.',
    featureList: ['250-count run', 'Matte thick stock', 'QR-ready branding'],
  },
  {
    id: 'digital-business-card',
    name: 'Digital Business Card',
    description: 'Tap-to-share NFC smart card with your custom branding, social links, and contact info built in.',
    priceCents: 2900,
    image: '/logo-badge.jpg',
    badge: 'New',
    category: 'business-cards',
    shortLabel: 'Fastest Intro',
    bestFor: 'Members who want instant contact sharing and a more modern sales image.',
    leadTime: 'Digital setup timing varies by customization needs.',
    featureList: ['Tap-to-share NFC', 'Custom contact profile', 'Modern first impression'],
  },
];
