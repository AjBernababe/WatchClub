"use client";

import logout from "@/actions/auth/logout";
import { Button } from "../ui/button";

export function LogoutBtn() {
  return <Button onClick={logout}>Log Out</Button>;
}
