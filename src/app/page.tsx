import { HomeAuth } from "@/components/home-auth";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center bg-zinc-50 px-4 py-10 font-sans dark:bg-black sm:py-12">
      <HomeAuth />
    </div>
  );
}
