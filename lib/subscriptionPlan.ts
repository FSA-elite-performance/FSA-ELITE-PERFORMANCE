export const SUBSCRIPTION_NAME = 'FSA ELITE Membership';
export const SUBSCRIPTION_DESCRIPTION =
  'Built for salespeople who want more — more confidence, more skill, more production, and more results. One payment unlocks AI objection drills, a 17+ product rep-branding store, and every future update. No subscription. Lifetime access.';
export const SUBSCRIPTION_PRICE_CENTS = 1299;

export const SUBSCRIPTION_PRODUCT_ID = 'prod_UC3ZdA1h6sSp3g';
export const SUBSCRIPTION_PRODUCT_TAX_CODE = 'txcd_10000000';

export const SUBSCRIPTION_MARKETING_FEATURES = [
  'AI Roleplay Lab with 5 buyer personas — drill confidence, skill, and closing power before the real money is on the line',
  'Member store with 17+ products: business cards, desk gear, promo tools, closer gear, and creator kits',
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