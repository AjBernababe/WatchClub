import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <div className="fixed bottom-10 right-10">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
