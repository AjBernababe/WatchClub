import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { SessionWrapper } from "@/components/providers/sessionProvider";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { ThemeToggle } from "@/components/shared/themeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Watch Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
