export const SUBSCRIPTION_NAME = 'FSA ELITE Founding Access';
export const SUBSCRIPTION_DESCRIPTION =
  'One payment. Phase One access to the current FSA ELITE sales performance system — AI objection drills, the FSA Store, and rep-branding tools. No recurring charges.';
export const SUBSCRIPTION_PRICE_CENTS = 1299;

export const SUBSCRIPTION_PRODUCT_ID = 'prod_UC3ZdA1h6sSp3g';
export const SUBSCRIPTION_PRODUCT_TAX_CODE = 'txcd_10000000';

export const SUBSCRIPTION_MARKETING_FEATURES = [
  'Founding access to the current AI Roleplay Lab with 5 buyer personas and real-time scoring',
  'Dashboard visibility across 6 sales skills so reps and managers can spot what needs work fast',
  'FSA Store access with 15+ business cards, desk gear, promo tools, closer gear, and creator kits',
  'Founder pricing while FSA ELITE expands into recurring team training, rep systems, and enterprise coaching',
] as const;

export const SUBSCRIPTION_METADATA = {
  access_type: 'one_time_payment',
  audience: 'sales_reps_and_teams',
  product_type: 'founding_access',
} as const;

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
