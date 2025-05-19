"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      className="cursor-pointer rounded-full"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="icon"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
