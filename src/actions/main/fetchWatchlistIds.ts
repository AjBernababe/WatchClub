"use server";

import prisma from "@/lib/prisma";
import { getSessionUserId } from "@/utils/sessionHelper";

/**
 * Fetches only the tmdbIds of user's watchlist items for efficient lookup
 * Returns a Set for O(1) lookup performance
 * @throws {Error} If user is not authenticated or database query fails
 */
export default async function fetchWatchlistIds(): Promise<Set<string>> {
  const userId = await getSessionUserId();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const watchlistItems = await prisma.watchlistItem.findMany({
      where: {
        userId,
      },
      select: {
        tmdbId: true, // Only fetch tmdbId, not the entire object
      },
    });

    // Convert array to Set for O(1) lookup
    return new Set(watchlistItems.map((item) => item.tmdbId));
  } catch (error) {
    console.error("Failed to fetch watchlist IDs:", error);
    throw new Error("Failed to fetch watchlist IDs");
  }
}
