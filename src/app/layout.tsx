import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Metadata } from "next";
import { SessionWrapper } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Watch Club",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionWrapper>
          <ThemeProvider>
            <ThemeToggle />
            {children}
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
