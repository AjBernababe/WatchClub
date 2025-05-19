"use client";

import { RequireAuth } from "@/components/providers/requireAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth require="guest">{children}</RequireAuth>;
}
