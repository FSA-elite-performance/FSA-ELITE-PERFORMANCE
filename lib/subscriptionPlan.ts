export const SUBSCRIPTION_NAME = 'FSA ELITE Membership';
export const SUBSCRIPTION_DESCRIPTION =
  'One payment. Lifetime access. AI roleplay training that sharpens how you sell, and 17+ identity products that sharpen how you show up. For less than a sales lunch — train like a closer, look like a closer, build a name people remember.';
export const SUBSCRIPTION_PRICE_CENTS = 1299;

export const SUBSCRIPTION_PRODUCT_ID = 'prod_UC3ZdA1h6sSp3g';
export const SUBSCRIPTION_PRODUCT_TAX_CODE = 'txcd_10000000';

export const SUBSCRIPTION_MARKETING_FEATURES = [
  'AI Roleplay Lab with 5 buyer personas — pressure-test your close before the real money is on the line',
  '17+ identity and presence products: business cards, desk gear, promo tools, closer gear, and creator kits',
  'Rep-branding tools built for real selling environments: portfolios, notepads, presentation folders, and more',
  'Lifetime access to all current and future FSA ELITE training content — no monthly subscription ever',
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