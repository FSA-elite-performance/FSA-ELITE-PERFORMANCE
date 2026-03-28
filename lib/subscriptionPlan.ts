export const SUBSCRIPTION_NAME = 'FSA ELITE Full Access Training';
export const SUBSCRIPTION_DESCRIPTION =
  'One payment. Full access. AI objection drills, a 15+ product member store, and rep-branding tools that make closers sharper and more memorable — for less than a sales lunch.';
export const SUBSCRIPTION_PRICE_CENTS = 1299;

export const SUBSCRIPTION_PRODUCT_ID = 'prod_U4BAF8DNlKwHH5';
export const SUBSCRIPTION_PRODUCT_TAX_CODE = 'txcd_10000000';

export const SUBSCRIPTION_MARKETING_FEATURES = [
  'AI Roleplay Lab with 5 buyer personas — pressure-test your close before the real money is on the line',
  'Member store with 15+ products: business cards, desk gear, promo tools, closer gear, and creator kits',
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