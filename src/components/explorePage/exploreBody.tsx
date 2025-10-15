"use client";

import { TMDBItem } from "@/lib/tmdb";
import { Spinner } from "../ui/spinner";
import { ExploreItemCard } from "./exploreItemCard";

type ExploreBodyProps = {
  items: TMDBItem[];
  isLoading: boolean;
  hasSearched: boolean;
};

export function ExploreBody({
  items,
  isLoading,
  hasSearched,
}: ExploreBodyProps) {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <>
          {items.length === 0 && hasSearched ? (
            <div className="text-center">No results found</div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,200px))] gap-5 justify-center">
              {items?.map((item: TMDBItem) => (
                <ExploreItemCard key={item.tmdbId} tmdbItem={item} />
              ))}
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
