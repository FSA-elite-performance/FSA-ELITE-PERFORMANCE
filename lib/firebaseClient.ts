/**
 * Firebase client SDK — browser only.
 * Only call getClientAuth() inside useEffect / event handlers, never during SSR.
 */
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

function getClientApp() {
  if (getApps().length > 0) return getApp();
  return initializeApp(firebaseConfig);
}

export function getClientAuth(): Auth {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used in the browser.');
  }
  return getAuth(getClientApp());
}
