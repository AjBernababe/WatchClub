"use client";

import { useDraggable } from "@dnd-kit/react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";
import type { WatchlistItem, Status } from "@prisma/client";
import { ItemDetailsDialog } from "../shared/itemDetailsDialog";

type WatchlistItemCardProps = {
  watchlistItem: WatchlistItem;
  onStatusChange?: (itemId: string, newStatus: Status) => void;
  onRemoveFromWatchlist?: (itemId: string) => void;
};

export function WatchlistItemCard({
  watchlistItem,
  onStatusChange,
  onRemoveFromWatchlist,
}: WatchlistItemCardProps) {
  const { ref } = useDraggable({
    id: watchlistItem.id,
  });

  return (
    <ItemDetailsDialog
      item={watchlistItem}
      variant="watchlist"
      onStatusChange={onStatusChange}
      onRemoveFromWatchlist={onRemoveFromWatchlist}
    >
      <Card
        ref={ref}
        className="p-0 overflow-hidden min-h-[110px] group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="flex h-full">
          <div className="relative w-[80px] flex-shrink-0">
            <Image
              src={watchlistItem.image || "/placeholder.svg"}
              alt={watchlistItem.title}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority={false}
            />
          </div>

          <div className="flex-1 p-3 flex flex-col justify-between min-h-0">
            <div className="flex items-center justify-between flex-shrink-0">
              <Badge
                variant={watchlistItem.type === "TV" ? "default" : "secondary"}
                className="text-xs font-medium"
              >
                {watchlistItem.type}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-foreground">
                  {watchlistItem.rating}
                </span>
              </div>
            </div>

            <div className="flex-1 flex items-center py-1">
              <h3 className="font-semibold text-sm line-clamp-2 text-foreground leading-tight">
                {watchlistItem.title}
              </h3>
            </div>

            <p className="text-xs text-muted-foreground flex-shrink-0">
              {watchlistItem.year}
            </p>
          </div>
        </div>
      </Card>
    </ItemDetailsDialog>
  );
}
