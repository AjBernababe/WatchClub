"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TMDBItem } from "@/lib/tmdb";

export default async function addToWatchlist(tmdbItem: TMDBItem) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    const existingItem = await prisma.tMDBItem.findFirst({
      where: {
        userId: session.user.id,
        tmdbId: tmdbItem.tmdbId,
      },
    });

    if (existingItem) {
      return;
    }

    await prisma.tMDBItem.create({
      data: {
        userId: session.user.id,
        ...tmdbItem,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to add item to Watchlist");
  }
}
