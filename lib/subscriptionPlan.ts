export type PricingTier = {
  id: 'solo' | 'team' | 'enterprise';
  name: string;
  priceLabel: string;
  cadenceLabel: string;
  description: string;
  bestFor: string;
  ctaLabel: string;
  contactOnly?: boolean;
};

export const FLAGSHIP_OFFER_NAME = '90-Day Sales Performance Sprint';
export const FLAGSHIP_OFFER_DESCRIPTION =
  'A revenue-first engagement for small and mid-sized businesses: tighten the offer, train the reps, install scorecards, and turn the best-performing sales process into a repeatable system before building more software.';

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'solo',
    name: 'Solo Access',
    priceLabel: '$12.99',
    cadenceLabel: 'self-serve launch access',
    description:
      'Immediate access to the AI Roleplay Lab, dashboard, and member store for one rep.',
    bestFor: 'Individual closers who want to sharpen the pitch right now.',
    ctaLabel: 'Start Solo Access',
  },
  {
    id: 'team',
    name: 'Team Performance Plan',
    priceLabel: 'Custom',
    cadenceLabel: 'monthly recurring engagement',
    description:
      'Coaching, KPI reviews, and scorecards for teams that need weekly accountability tied to revenue.',
    bestFor: 'Owners and managers building measurable weekly improvement.',
    ctaLabel: 'Talk About Team Pricing',
    contactOnly: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Revenue System',
    priceLabel: 'Custom',
    cadenceLabel: 'licensing + rollout scope',
    description:
      'Recruiting structure, SOP rollout, and future software alignment for larger organizations.',
    bestFor: 'Multi-location teams and partners building a repeatable sales machine.',
    ctaLabel: 'Plan Enterprise Rollout',
    contactOnly: true,
  },
];

export const SUBSCRIPTION_NAME = 'FSA ELITE Solo Access';
export const SUBSCRIPTION_DESCRIPTION =
  'Self-serve launch access for individual reps who want AI objection drills, a performance dashboard, and the member store while FSA Elite Performance scales team and enterprise sales systems.';
export const SUBSCRIPTION_PRICE_CENTS = 1299;

export const SUBSCRIPTION_PRODUCT_ID = 'prod_UC3ZdA1h6sSp3g';
export const SUBSCRIPTION_PRODUCT_TAX_CODE = 'txcd_10000000';

export const SUBSCRIPTION_MARKETING_FEATURES = [
  'AI Roleplay Lab with 5 buyer personas — pressure-test your close before the real money is on the line',
  'Performance dashboard and training stack shaped by real sales coaching delivery',
  'Member store with 15+ products: business cards, desk gear, promo tools, closer gear, and creator kits',
  'Designed as the individual starting point while team and enterprise programs are scoped separately',
] as const;

export const SUBSCRIPTION_METADATA = {
  access_type: 'solo_launch_access',
  audience: 'individual_sales_reps',
  product_type: 'sales_performance_training',
} as const;

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
