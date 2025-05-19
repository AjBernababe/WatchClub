"use client";

import { ThemeToggle } from "@/components/shared/themeToggle";
import { Typography } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <>
      <main>
        <Typography.H3>Start tracking your favorite shows at</Typography.H3>
        <Typography.H1 className="text-brand">Watch Club</Typography.H1>
        <Typography.H3>
          First rule of Watch Club: Please talk about Watch Club 👉👈
        </Typography.H3>
      </main>
    </>
  );
}
