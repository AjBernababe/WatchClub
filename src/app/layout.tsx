import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Metadata } from "next";
import { SessionWrapper } from "@/components/providers/SessionWrapper";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
