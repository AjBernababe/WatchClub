"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const getTitle = (path: string) => {
  switch (path) {
    case "/dashboard":
      return "Dashboard";
    case "/watchlist":
      return "Watchlist";
    case "/explore":
      return "Explore";
  }
};

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <h1 className="text-xl font-semibold">{getTitle(pathname)}</h1>
    </header>
  );
}
