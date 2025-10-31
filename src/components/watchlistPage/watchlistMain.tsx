"use client";

import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { WatchlistColumn } from "./watchlistColumn";
import updateWatchlistItemStatus from "@/actions/main/updateWatchlistItemStatus";
import type { WatchlistItem, Status } from "@prisma/client";

type WatchlistMainProps = {
  watchlistData: WatchlistItem[];
};

const COLUMNS = [
  { id: "To_Watch" as Status, title: "To Watch" },
  { id: "Watching" as Status, title: "Watching" },
  { id: "Completed" as Status, title: "Completed" },
  { id: "Dropped" as Status, title: "Dropped" },
];

export function WatchlistMain({ watchlistData }: WatchlistMainProps) {
  const [watchlistItems, setWatchlistItems] =
    useState<WatchlistItem[]>(watchlistData);

  const handleStatusChange = (itemId: string, newStatus: Status) => {
    setWatchlistItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleRemoveFromWatchlist = (itemId: string) => {
    setWatchlistItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleDragEnd = async ({ operation }: any) => {
    const { source, target } = operation;
    if (source && target && source.id !== target.id) {
      const newStatus = target.id as Status;

      setWatchlistItems((items) =>
        items.map((item) =>
          item.id === source.id ? { ...item, status: newStatus } : item
        )
      );

      await updateWatchlistItemStatus({
        watchlistItemId: source.id,
        newStatus: newStatus,
      });
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)] overflow-hidden">
      <DragDropProvider onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => (
          <WatchlistColumn
            key={column.id}
            watchlistColumn={column}
            watchlistItems={watchlistItems.filter(
              (item) => item.status === column.id
            )}
            onStatusChange={handleStatusChange}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
          />
        ))}
      </DragDropProvider>
    </div>
  );
}
