"use client";

import { useDraggable } from "@dnd-kit/react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import type { WatchlistItem } from "@prisma/client";

type WatchlistItemCardProps = {
  watchlistItem: WatchlistItem;
};

export function WatchlistItemCard({ watchlistItem }: WatchlistItemCardProps) {
  const { ref } = useDraggable({
    id: watchlistItem.id,
  });

  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle>{watchlistItem.title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
