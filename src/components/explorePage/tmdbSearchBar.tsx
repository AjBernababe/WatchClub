"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface TMDBSearchResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  media_type: "movie" | "tv";
  genre_ids: number[];
}

interface TMDBSearchResponse {
  results: TMDBSearchResult[];
  total_results: number;
  total_pages: number;
  page: number;
}

export default function TMDBSearchbar() {
  const form = useForm();
  const [searchResults, setSearchResults] = useState<TMDBSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: any) => {
    const query = values.searchString?.trim();

    if (!query) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/tmdb/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to search");
      }

      const data: TMDBSearchResponse = await response.json();
      setSearchResults(data.results);
      console.log("Search results:", data.results);
    } catch (err) {
      setError("Failed to search. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full"
        >
          <FormField
            control={form.control}
            name="searchString"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search for Movies or TV Shows..."
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>
        </form>
      </Form>

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
          <div className="grid gap-4">
            {searchResults.slice(0, 10).map((result) => (
              <div key={result.id} className="flex gap-4 p-4 border rounded-lg">
                {result.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                    alt={result.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold">{result.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    {result.media_type === "movie" ? "Movie" : "TV Show"} •{" "}
                    {result.release_date
                      ? new Date(result.release_date).getFullYear()
                      : "N/A"}
                  </p>
                  <p
                    className="text-sm overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical" as const,
                    }}
                  >
                    {result.overview}
                  </p>
                  {result.vote_average > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      ⭐ {result.vote_average.toFixed(1)}/10
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
