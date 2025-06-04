import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

type DynamicLinkProps = {
  session: Session | null;
  variant: "main" | "nav";
};

export function DynamicLink({ session, variant }: DynamicLinkProps) {
  if (variant === "main") {
    const href = session ? "/dashboard" : "/login";
    const text = "Start Tracking";

    return (
      <Button asChild size="lg" className="mt-8">
        <Link href={href}>{text}</Link>
      </Button>
    );
  }

  if (session) {
    return (
      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button asChild variant="outline">
        <Link href="/register">Sign Up</Link>
      </Button>
      <Button asChild>
        <Link href="/login">Sign In</Link>
      </Button>
    </div>
  );
}
