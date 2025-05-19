import { ThemeToggle } from "@/components/shared/themeToggle";
import { H1, H3, Muted } from "@/components/ui/typography";
import Image from "next/image";
import {
  NavAuthButton,
  StartTrackingButton,
} from "@/components/homePage/dynamicLink";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <nav className="px-10 flex items-center h-16 justify-between">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/navbarLogo.png"
              alt="Logo"
              width={42}
              height={42}
              priority
            />
          </Link>
        </div>

        <div>
          <Muted>Work in Progress</Muted>
        </div>

        <div className="flex items-center justify-center gap-2">
          <NavAuthButton />
        </div>
      </nav>

      <main className="m-20">
        <H3>Start tracking your favorite shows with</H3>
        <H1 className="text-brand">Watch Club</H1>
        <H3>First rule of Watch Club: Please talk about Watch Club 👉👈</H3>

        <StartTrackingButton />
      </main>

      <div className="fixed bottom-10 right-10">
        <ThemeToggle />
      </div>
    </>
  );
}
