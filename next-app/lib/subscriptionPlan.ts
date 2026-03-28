export const SUBSCRIPTION_NAME = 'Elite Sales Performance';
export const SUBSCRIPTION_DESCRIPTION =
  'FSA Elite Sales Performance - premium coaching, proven sales strategies, and analytics to boost rep productivity and revenue.';
export const SUBSCRIPTION_PRICE_CENTS = 1299;

export const SUBSCRIPTION_PRODUCT_ID = 'prod_UC3ZdA1h6sSp3g';
export const SUBSCRIPTION_PRODUCT_TAX_CODE = 'txcd_10000000';

export const SUBSCRIPTION_MARKETING_FEATURES = [
  'Built for automotive, real estate, insurance, solar, retail, and B2B',
  'AI roleplay lab + AI self-branding tools for logos and identity',
  'Premium and digital business cards in the member store',
  'One-time access to full Elite Sales training with ongoing updates',
] as const;

export const SUBSCRIPTION_METADATA = {
  access_type: 'one_time_payment',
  audience: 'salespeople_all_industries',
  product_type: 'training_course',
} as const;

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}