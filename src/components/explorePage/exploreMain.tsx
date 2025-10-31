"use client";

import { useState } from "react";
import { ExploreBody } from "./exploreBody";
import { ExplorePagination } from "./explorePagination";
import { ExploreSearchbar } from "./exploreSearchbar";
import { TMDBSearchResponse } from "@/lib/tmdb";

type ExploreMainProps = {
  watchlistIds: Set<string>;
};

export function ExploreMain({ watchlistIds }: ExploreMainProps) {
  const [searchResults, setSearchResults] = useState<TMDBSearchResponse>();
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [localWatchlistIds, setLocalWatchlistIds] =
    useState<Set<string>>(watchlistIds);

  const handleTMDBSearch = async (searchQuery: string, page: number = 1) => {
    setCurrentSearchQuery(searchQuery);
    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/tmdb/search?searchQuery=${encodeURIComponent(
          searchQuery
        )}&page=${page}`
      );

      const result: TMDBSearchResponse = await response.json();

      setSearchResults(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWatchlist = (tmdbId: string) => {
    setLocalWatchlistIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(tmdbId);
      return newSet;
    });
  };

  const handleRemoveFromWatchlist = (tmdbId: string) => {
    setLocalWatchlistIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(tmdbId);
      return newSet;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <ExploreSearchbar handleTMDBSearch={handleTMDBSearch} />

      <ExploreBody
        items={searchResults?.items || []}
        isLoading={isLoading}
        hasSearched={hasSearched}
        watchlistIds={localWatchlistIds}
        onAddToWatchlist={handleAddToWatchlist}
        onRemoveFromWatchlist={handleRemoveFromWatchlist}
      />

      {searchResults && searchResults.items.length !== 0 && !isLoading && (
        <ExplorePagination
          page={searchResults.page}
          pageCount={searchResults.total_pages}
          searchQuery={currentSearchQuery}
          handleTMDBSearch={handleTMDBSearch}
        />
      )}
    </div>
  );
}
