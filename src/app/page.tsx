import { DynamicLink } from "@/components/homePage/dynamicLink";
import { H1, H3, Muted } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/navbarLogo.png"
                alt="Watch Club Logo"
                width={42}
                height={42}
                priority
                className="rounded-md"
              />
            </Link>

            <div className="flex items-center">
              <DynamicLink variant="nav" session={session} />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <H3 className="text-muted-foreground">
                Start tracking your favorite shows with
              </H3>
              <H1 className="text-brand text-4xl sm:text-5xl lg:text-6xl font-bold">
                Watch Club
              </H1>
              <H3 className="text-muted-foreground max-w-2xl mx-auto">
                First rule of Watch Club: Please talk about Watch Club 👉👈
              </H3>
            </div>

            <DynamicLink variant="main" session={session} />
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Muted className="text-xs">
              © 2025 Watch Club. Work in progress.
            </Muted>
          </div>
        </div>
      </footer>
    </div>
  );
}
