"use client";

import type { TMDBItem } from "@/lib/tmdb";
import { Spinner } from "../ui/spinner";
import { TMDBItemCard } from "../shared/tmdbItemCard";

type ExploreBodyProps = {
  items: TMDBItem[];
  isLoading: boolean;
};

export default function ExploreBody({ items, isLoading }: ExploreBodyProps) {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <>
          {items.length === 0 ? (
            <div className="text-center text-gray-500">No results found</div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,200px))] gap-5 justify-center">
              {items?.map((item: any) => (
                <TMDBItemCard key={item.tmdbId} {...item} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
