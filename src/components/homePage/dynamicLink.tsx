import Link from "next/link";
import { Button } from "../ui/button";
import { Session } from "next-auth";

type DynamicLinkProps = {
  session: Session | null;
  variant: "main" | "nav";
};

export async function DynamicLink({ session, variant }: DynamicLinkProps) {
  if (variant === "main") {
    const href = session ? "/dashboard" : "/login";
    return (
      <Button asChild>
        <Link href={href}>Start tracking</Link>
      </Button>
    );
  }

  if (session) {
    return (
      <Button asChild variant="brand">
        <Link href="/dashboard">Open Watch Club</Link>
      </Button>
    );
  }

  return (
    <>
      <Button asChild variant="outline">
        <Link href="/register">Create an Account</Link>
      </Button>

      <Button asChild variant="brand">
        <Link href="/login">Login</Link>
      </Button>
    </>
  );
}
