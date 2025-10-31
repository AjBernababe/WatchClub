"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TMDBItem } from "@/lib/tmdb";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Star, Calendar, Check, ChevronDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import addToWatchlist from "@/actions/main/addToWatchlist";
import updateWatchlistItemStatus from "@/actions/main/updateWatchlistItemStatus";
import removeFromWatchlist from "@/actions/main/removeFromWatchlist";
import { Status, WatchlistItem } from "@prisma/client";
import { useState } from "react";

type ItemDetailsDialogProps = {
  item: TMDBItem | WatchlistItem;
  children: React.ReactNode;
  variant?: "explore" | "watchlist";
  onStatusChange?: (itemId: string, newStatus: Status) => void;
  isInWatchlist?: boolean;
  onToggleWatchlist?: (e: React.MouseEvent) => Promise<void>;
  onRemoveFromWatchlist?: (itemId: string) => void;
};

export function ItemDetailsDialog({
  item,
  children,
  variant = "explore",
  onStatusChange,
  isInWatchlist = false,
  onToggleWatchlist,
  onRemoveFromWatchlist,
}: ItemDetailsDialogProps) {
  const initialStatus = ("status" in item ? item.status : "To_Watch") as Status;
  const [currentStatus, setCurrentStatus] = useState<Status>(initialStatus);
  const [open, setOpen] = useState(false);

  const handleStatusSelect = (newStatus: Status) => {
    // Only update local state when dropdown changes
    setCurrentStatus(newStatus);
  };

  const handleRemoveClick = async () => {
    if (!("id" in item)) return;

    const itemId = (item as WatchlistItem).id;
    const tmdbId = (item as WatchlistItem).tmdbId;

    try {
      // Remove from database
      await removeFromWatchlist(tmdbId);

      // Notify parent component to update UI
      if (onRemoveFromWatchlist) {
        onRemoveFromWatchlist(itemId);
      }

      // Close the dialog
      setOpen(false);

      toast.success("Removed from watchlist", {
        icon: <Check className="w-5 h-5" />,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to remove from watchlist", {
        duration: 2000,
      });
    }
  };

  const handleDialogClose = async (isOpen: boolean) => {
    setOpen(isOpen);

    // When closing the dialog, check if status changed and update database
    if (!isOpen && variant === "watchlist" && "id" in item) {
      const itemId = (item as WatchlistItem).id;
      const originalStatus = (item as WatchlistItem).status;

      // Only update if status actually changed
      if (currentStatus !== originalStatus) {
        // Notify parent component to update kanban board
        if (onStatusChange) {
          onStatusChange(itemId, currentStatus);
        }

        // Update in database
        await updateWatchlistItemStatus({
          watchlistItemId: itemId,
          newStatus: currentStatus,
        });
      }
    }

    // Reset to original status if dialog was closed
    if (!isOpen) {
      setCurrentStatus(initialStatus);
    }
  };

  const statusOptions: Status[] = [
    "To_Watch",
    "Watching",
    "Completed",
    "Dropped",
  ];

  const {
    tmdbId,
    title,
    image,
    type,
    year,
    rating,
    overview,
    genres,
    backdropImage,
  } = item;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-background border-none"
        showCloseButton={true}
      >
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>

        <div className="relative h-full overflow-y-auto">
          {/* Hero Section with Backdrop */}
          <div className="relative h-[50vh] md:h-[55vh] w-full">
            {/* Backdrop Image */}
            <div className="absolute inset-0">
              <Image
                src={backdropImage}
                alt={title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                {/* Poster */}
                <div className="hidden sm:block shrink-0 w-32 md:w-40 rounded-lg overflow-hidden shadow-2xl border border-border/50">
                  <Image
                    src={image}
                    alt={title}
                    width={200}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>

                {/* Title and Meta Info */}
                <div className="flex-1 space-y-3">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground drop-shadow-lg">
                    {title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                    <Badge
                      variant="outline"
                      className="gap-1.5 bg-background/80 backdrop-blur-sm"
                    >
                      <Star className="size-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{rating}</span>
                    </Badge>

                    <Badge
                      variant="outline"
                      className="gap-1.5 bg-background/80 backdrop-blur-sm"
                    >
                      <Calendar className="size-4" />
                      <span>{year}</span>
                    </Badge>

                    <Badge
                      variant="secondary"
                      className="bg-background/80 backdrop-blur-sm"
                    >
                      {type}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {variant === "explore" ? (
                      <Button
                        size="lg"
                        variant="outline"
                        className="gap-2 bg-background/60 backdrop-blur-sm hover:bg-background/80"
                        onClick={onToggleWatchlist}
                      >
                        {isInWatchlist ? (
                          <>
                            <Check className="size-5" />
                            In Watchlist
                          </>
                        ) : (
                          <>
                            <Plus className="size-5" />
                            Add to Watchlist
                          </>
                        )}
                      </Button>
                    ) : (
                      <>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="lg"
                              variant="outline"
                              className="gap-2 bg-background/60 backdrop-blur-sm hover:bg-background/80"
                            >
                              {currentStatus.replace("_", " ")}
                              <ChevronDown className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {statusOptions.map((status) => (
                              <DropdownMenuItem
                                key={status}
                                onSelect={() => handleStatusSelect(status)}
                                className={
                                  currentStatus === status ? "bg-accent" : ""
                                }
                              >
                                {status.replace("_", " ")}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                          size="lg"
                          variant="outline"
                          className="gap-2 bg-background/60 backdrop-blur-sm hover:bg-background/80"
                          onClick={handleRemoveClick}
                        >
                          <Trash2 className="size-5" />
                          Remove from Watchlist
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                Overview
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {overview || "No overview available."}
              </p>
            </div>

            {/* Genres */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm px-3 py-1"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-2 font-medium text-foreground">{type}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Release Year:</span>
                <span className="ml-2 font-medium text-foreground">{year}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Rating:</span>
                <span className="ml-2 font-medium text-foreground">
                  {rating === "N/A" ? rating : `${rating}/10`}
                </span>
              </div>
              <div>
                <a
                  href={`https://www.themoviedb.org/${type.toLowerCase()}/${tmdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline font-medium inline-flex items-center gap-1"
                >
                  More Info on TMDB
                  <svg
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
