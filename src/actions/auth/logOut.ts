"use server";

import { signOut } from "@/lib/auth";

export default async function logOut() {
  await signOut({
    redirectTo: "/",
  });
}
