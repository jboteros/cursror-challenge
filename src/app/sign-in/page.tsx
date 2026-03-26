import type { Metadata } from "next";

import { SignInClient } from "./sign-in-client";

export const metadata: Metadata = {
  title: "Sign in · Cursor Colombia events",
  description:
    "Discover upcoming Cursor events across Colombia—meetups, workshops, and community sessions on an interactive map.",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <SignInClient />
    </div>
  );
}
