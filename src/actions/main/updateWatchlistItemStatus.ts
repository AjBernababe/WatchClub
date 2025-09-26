"use server";

import prisma from "@/lib/prisma";
import { getSessionUserId } from "@/utils/sessionHelper";
import type { Status } from "@prisma/client";

type UpdateWatchlistItemStatusParams = {
  watchlistItemId: string;
  newStatus: Status;
};

export default async function updateWatchlistItemStatus(
  params: UpdateWatchlistItemStatusParams
) {
  const userId = await getSessionUserId();
  if (!userId) throw new Error("User not authenticated");

  const { watchlistItemId, newStatus } = params;

  await prisma.watchlistItem.updateMany({
    where: {
      id: watchlistItemId,
      userId: userId,
    },
    data: {
      status: newStatus,
    },
  });
}
