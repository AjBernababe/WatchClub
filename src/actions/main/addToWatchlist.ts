"use server";

import prisma from "@/lib/prisma";
import { getSessionUserId } from "@/utils/sessionHelper";
import { TMDBItem } from "@/lib/tmdb";

export default async function addToWatchlist(tmdbItem: TMDBItem) {
  const userId = await getSessionUserId();

  try {
    const existingItem = await prisma.watchlistItem.findFirst({
      where: {
        userId,
        tmdbId: tmdbItem.tmdbId,
      },
    });

    if (existingItem) {
      return;
    }

    await prisma.watchlistItem.create({
      data: {
        userId,
        ...tmdbItem,
        status: "To_Watch",
      },
    });
  } catch (error) {
    throw new Error("Failed to add item to Watchlist");
  }
}
