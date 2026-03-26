type LoginBrandHeadingProps = {
  /** Tighter spacing when nested inside a small card */
  variant?: "page" | "card";
};

export function LoginBrandHeading({ variant = "page" }: LoginBrandHeadingProps) {
  const titleClass =
    variant === "card"
      ? "text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl"
      : "text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl";

  return (
    <div className="flex max-w-lg flex-col items-center text-center">
      <h1 className={titleClass}>Cursor Colombia events</h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Sign in to discover upcoming Cursor meetups, workshops, and community sessions across
        Colombia—and explore them on the interactive map.
      </p>
    </div>
  );
}
