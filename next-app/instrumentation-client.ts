import { initBotId } from 'botid/client/core';

if (process.env.NEXT_PUBLIC_IS_STATIC_EXPORT !== '1') {
  initBotId({
    protect: [
      {
        path: '/api/ai-chat',
        method: 'POST',
      },
      {
        path: '/api/create-checkout-session',
        method: 'POST',
      },
    ],
  });
}
