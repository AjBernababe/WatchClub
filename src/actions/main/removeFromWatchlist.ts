"use server";

import prisma from "@/lib/prisma";
import { getSessionUserId } from "@/utils/sessionHelper";

/**
 * Removes an item from the user's watchlist
 * @param tmdbId - The TMDB ID of the item to remove
 * @throws {Error} If user is not authenticated or removal fails
 */
export default async function removeFromWatchlist(tmdbId: string) {
  const userId = await getSessionUserId();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!tmdbId) {
    throw new Error("TMDB ID is required");
  }

  try {
    const result = await prisma.watchlistItem.deleteMany({
      where: {
        userId,
        tmdbId,
      },
    });

    if (result.count === 0) {
      console.warn(`No watchlist item found for tmdbId: ${tmdbId}`);
    }

    return { success: true, count: result.count };
  } catch (error) {
    console.error("Failed to remove item from watchlist:", error);
    throw new Error("Failed to remove item from Watchlist");
  }
}
