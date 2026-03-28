/**
 * `basic` is lighter-weight and suits lower-risk endpoints, while `deepAnalysis`
 * adds stronger bot detection for higher-value actions such as payments.
 */
export type BotIdCheckLevel = 'basic' | 'deepAnalysis';

export type BotIdProtectedRoute = {
  path: string;
  method: 'POST';
  advancedOptions: {
    checkLevel: BotIdCheckLevel;
  };
};

export const BOTID_ROUTE_CONFIG = {
  createCheckoutSession: {
    path: '/api/create-checkout-session',
    method: 'POST',
    advancedOptions: {
      checkLevel: 'deepAnalysis',
    },
  },
  aiChat: {
    path: '/api/ai-chat',
    method: 'POST',
    advancedOptions: {
      checkLevel: 'basic',
    },
  },
} satisfies Record<string, BotIdProtectedRoute>;

export const BOTID_PROTECTED_ROUTES = Object.values(BOTID_ROUTE_CONFIG);
