import { initBotId } from 'botid/client/core';
import { BOTID_PROTECTED_ROUTES } from './lib/botid-config';

if (process.env.NEXT_PUBLIC_BOTID_ENABLED === '1') {
  initBotId({
    protect: BOTID_PROTECTED_ROUTES,
  });
}
