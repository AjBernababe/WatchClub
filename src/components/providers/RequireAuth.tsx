"use client";

import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type RequireAuthProps = {
  children: ReactNode;
  require?: "auth" | "guest";
  redirectTo?: string;
};

export function RequireAuth({
  children,
  require = "auth",
  redirectTo,
}: RequireAuthProps) {
  const { status } = useSession();
  const router = useRouter();

  // Determine redirect path based on mode
  const redirectPath =
    redirectTo || (require === "auth" ? "/auth/login" : "/dashboard");

  useEffect(() => {
    if (
      (require === "auth" && status === "unauthenticated") ||
      (require === "guest" && status === "authenticated")
    ) {
      router.push(redirectPath);
    }
  }, [status, require, router, redirectPath]);

  // Don't render children while redirecting
  const shouldBlockRender =
    status === "loading" ||
    (require === "auth" && status === "unauthenticated") ||
    (require === "guest" && status === "authenticated");

  if (shouldBlockRender) {
    return null;
  }

  return <>{children}</>;
}
