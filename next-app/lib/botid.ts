import type { NextApiRequest } from 'next';
import { checkBotId } from 'botid/server';

export async function verifyBotIdRequest(req: NextApiRequest) {
  const requestPath = req.url?.split('?')[0] ?? '/unknown';

  return checkBotId({
    advancedOptions: {
      headers: {
        ...req.headers,
        'x-method': req.method ?? 'POST',
        'x-path': requestPath,
      },
    },
  });
}
