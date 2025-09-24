import { auth } from "@/lib/auth";

export async function getSessionUserId(): Promise<string> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  return session.user.id;
}
