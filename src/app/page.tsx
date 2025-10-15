import { DynamicLink } from "@/components/homePage/dynamicLink";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-transform hover:scale-105 duration-200"
            >
              <Image
                src="/navbarLogo.png"
                alt="WatchClub Logo"
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

      <div className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h2 className="text-muted-foreground text-lg sm:text-xl font-medium animate-in fade-in slide-in-from-bottom-2 duration-700">
                Start tracking your favorite shows with
              </h2>

              <h1 className="relative inline-block animate-in fade-in slide-in-from-bottom-3 duration-900">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 dark:from-teal-400 dark:via-cyan-400 dark:to-sky-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  WatchClub
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/20 via-cyan-600/20 to-sky-600/20 blur-2xl -z-10 opacity-70" />
              </h1>

              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000">
                First rule of WatchClub: Please talk about WatchClub 👉👈
              </p>
            </div>

            <div className="pt-4 animate-in fade-in slide-in-from-bottom-5 duration-1100">
              <DynamicLink variant="main" session={session} />
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 animate-in fade-in slide-in-from-bottom-6 duration-1200">
              <div className="p-6 rounded-lg border bg-card/50 backdrop-blur transition-all hover:shadow-lg hover:scale-105 duration-200">
                <div className="text-3xl mb-3">📺</div>
                <h3 className="font-semibold mb-2">Track Shows</h3>
                <p className="text-sm text-muted-foreground">
                  Keep tabs on all your favorite TV series in one place
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card/50 backdrop-blur transition-all hover:shadow-lg hover:scale-105 duration-200">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-semibold mb-2">Discover</h3>
                <p className="text-sm text-muted-foreground">
                  Explore trending shows and hidden gems
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card/50 backdrop-blur transition-all hover:shadow-lg hover:scale-105 duration-200">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground">
                  Never miss an episode of your watchlist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t py-8 bg-background/50 backdrop-blur">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 WatchClub. Work in progress.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
