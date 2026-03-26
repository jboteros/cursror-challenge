"use client";

import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { GoogleIcon } from "@/components/google-icon";
import { LoginBrandHeading } from "@/components/login-brand-heading";
import { auth, googleProvider } from "@/lib/firebase";

export function SignInClient() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setError(null);
    setPending(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code?: string }).code)
          : "";
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        setError(null);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Could not sign in. Try again.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8">
        <LoginBrandHeading variant="card" />
        <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
          Continue with Google to open the map
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-zinc-200 bg-white text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
      >
        <GoogleIcon className="h-5 w-5 shrink-0" />
        {pending ? "Opening Google…" : "Continue with Google"}
      </button>

      {error ? (
        <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
        <Link
          href="/"
          className="font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          Back to home
        </Link>
      </p>
    </div>
  );
}
