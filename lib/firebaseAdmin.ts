/**
 * Firebase Admin SDK — Node.js only.
 * Only import this from pages/api/* routes, never from middleware or client pages.
 */
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';

function initAdminApp() {
  if (getApps().length > 0) return getApp();

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim();
  // Env vars escape newlines as \n — unescape them for the PEM key.
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase Admin is not configured. Set FIREBASE_ADMIN_PROJECT_ID, ' +
        'FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in your environment.'
    );
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

export function getAdminAuth(): Auth {
  return getAuth(initAdminApp());
}
