"use client";

import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { auth, googleProvider } from "@/lib/firebase";

import { GoogleIcon } from "./google-icon";
import { LoginBrandHeading } from "./login-brand-heading";

const ColombiaMap = dynamic(
  () => import("@/components/colombia-map").then((m) => m.ColombiaMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[280px] w-full items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading map…</p>
      </div>
    ),
  },
);

function authErrorMessage(err: unknown): string | null {
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code?: string }).code)
      : "";
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
    return null;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Try again.";
}

export function HomeAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  async function handleGoogleSignIn() {
    setError(null);
    setPending(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const msg = authErrorMessage(err);
      setError(msg);
    } finally {
      setPending(false);
    }
  }

  async function handleSignOut() {
    setError(null);
    setPending(true);
    try {
      await signOut(auth);
    } catch (err: unknown) {
      const msg = authErrorMessage(err);
      setError(msg ?? "Could not sign out.");
    } finally {
      setPending(false);
    }
  }

  if (!ready) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
        Loading…
      </p>
    );
  }

  const label = user?.email ?? user?.displayName ?? "Signed in";

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6">
      {user ? (
        <>
          <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 sm:text-left">
              {label}
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={pending}
              className="flex h-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 sm:ml-auto"
            >
              {pending ? "Signing out…" : "Sign out"}
            </button>
          </div>
          <div className="w-full">
            <ColombiaMap />
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center gap-8">
          <LoginBrandHeading />
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={pending}
            className="flex h-12 min-w-[240px] items-center justify-center gap-3 rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            <GoogleIcon className="h-5 w-5 shrink-0" />
            {pending ? "Opening Google…" : "Continue with Google"}
          </button>
        </div>
      )}

      {error ? (
        <p className="max-w-sm text-center text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
