"use client";

import logOut from "@/actions/auth/logOut";
import { Button } from "../ui/button";

export function LogOutBtn() {
  return <Button onClick={logOut}>Log Out</Button>;
}
