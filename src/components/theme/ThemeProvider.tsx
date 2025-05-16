"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
  children: ReactNode;
  attribute?: "class";
  defaultTheme?: "system" | "dark" | "light";
  enableSystem?: boolean;
};

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
    >
      {children}
    </NextThemesProvider>
  );
}
