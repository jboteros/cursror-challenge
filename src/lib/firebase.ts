import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

function publicEnv(name: string): string {
  const v = process.env[name];
  if (typeof v !== "string" || v.length === 0) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and set Firebase values from the console.`,
    );
  }
  return v;
}

const firebaseConfig: FirebaseOptions = {
  apiKey: publicEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: publicEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: publicEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: publicEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: publicEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: publicEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: publicEnv("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
};

/** Single Firebase app instance (avoids duplicate init in Next.js dev / HMR). */
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/** Use only in Client Components or client-side code (`'use client'`). */
export const auth = getAuth(app);

/** Google Sign-In (enable “Google” in Firebase Console → Authentication → Sign-in method). */
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
