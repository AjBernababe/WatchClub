"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function StartTrackingButton() {
  const { data: session, status } = useSession();

  const href = session ? "/dashboard" : "/auth/login";

  return (
    <Button asChild disabled={status === "loading"}>
      {status === "loading" ? (
        <span>
          <Spinner className="h-8 w-8" />
        </span>
      ) : (
        <Link href={href}>Start tracking</Link>
      )}
    </Button>
  );
}

export function NavAuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner className="h-8 w-8" />;
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
      <Button asChild>
        <Link href="/auth/register">Sign Up</Link>
      </Button>
      <Button variant="brand" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
    </>
  );
}
