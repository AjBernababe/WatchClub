"use client";

import { RequireAuth } from "@/components/providers/requireAuth";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <RequireAuth require="guest">{children}</RequireAuth>;
}
