"use server";

import prisma from "@/lib/prisma";
import { getSessionUserId } from "@/utils/sessionHelper";
import type { WatchlistItem } from "@prisma/client";

export default async function fetchWatchlist(): Promise<WatchlistItem[]> {
  const userId = await getSessionUserId();

  try {
    const watchlist = await prisma.watchlistItem.findMany({
      where: {
        userId,
      },
    });

    return watchlist;
  } catch (error) {
    throw new Error("Failed to fetch watchlist due to unknown error");
  }
}
