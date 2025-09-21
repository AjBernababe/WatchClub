"use client";

import { useState } from "react";
import ExploreBody from "./exploreBody";
import ExplorePagination from "./explorePagination";
import ExploreSearchbar from "./exploreSearchbar";
import { TMDBSearchResponse } from "@/lib/tmdb";

export default function ExploreMain() {
  const [searchResults, setSearchResults] = useState<TMDBSearchResponse>();
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTMDBSearch = async (searchQuery: string, page: number = 1) => {
    setCurrentSearchQuery(searchQuery);
    setIsLoading(true);

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

  return (
    <div className="flex flex-col gap-5">
      <ExploreSearchbar handleTMDBSearch={handleTMDBSearch} />

      {searchResults && (
        <>
          <ExploreBody
            items={searchResults.items || []}
            isLoading={isLoading}
          />

          {searchResults.items.length !== 0 && !isLoading && (
            <ExplorePagination
              page={searchResults.page}
              pageCount={searchResults.total_pages}
              searchQuery={currentSearchQuery}
              handleTMDBSearch={handleTMDBSearch}
            />
          )}
        </>
      )}
    </div>
  );
}
