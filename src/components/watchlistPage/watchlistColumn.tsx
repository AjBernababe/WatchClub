"use client";

import { useDroppable } from "@dnd-kit/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WatchlistItemCard } from "./watchlistItemCard";
import type { WatchlistItem, Status } from "@prisma/client";

type WatchlistColumnProps = {
  watchlistColumn: { id: string; title: string };
  watchlistItems: WatchlistItem[];
  onStatusChange?: (itemId: string, newStatus: Status) => void;
  onRemoveFromWatchlist?: (itemId: string) => void;
};

export function WatchlistColumn({
  watchlistColumn,
  watchlistItems,
  onStatusChange,
  onRemoveFromWatchlist,
}: WatchlistColumnProps) {
  const { ref } = useDroppable({ id: watchlistColumn.id });

  return (
    <Card ref={ref} className="w-full">
      <CardHeader>
        <CardTitle>{watchlistColumn.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 h-full overflow-y-auto">
        {watchlistItems.map((item) => (
          <WatchlistItemCard
            key={item.id}
            watchlistItem={item}
            onStatusChange={onStatusChange}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
          />
        ))}
      </CardContent>
    </Card>
  );
}
