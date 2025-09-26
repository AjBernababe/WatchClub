"use client";

import { useDroppable } from "@dnd-kit/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WatchlistItemCard } from "./watchlistItemCard";
import type { WatchlistItem } from "@prisma/client";

type WatchlistColumnProps = {
  watchlistColumn: { id: string; title: string };
  watchlistItems: WatchlistItem[];
};

export function WatchlistColumn({
  watchlistColumn,
  watchlistItems,
}: WatchlistColumnProps) {
  const { ref } = useDroppable({ id: watchlistColumn.id });

  return (
    <Card ref={ref} className="w-full">
      <CardHeader>
        <CardTitle>{watchlistColumn.title}</CardTitle>
      </CardHeader>

      <CardContent>
        {watchlistItems.map((item) => (
          <WatchlistItemCard key={item.id} watchlistItem={item} />
        ))}
      </CardContent>
    </Card>
  );
}
