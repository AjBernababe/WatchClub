"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TmdbItems } from "./tmdbItems";
import { TmdbPagination } from "./tmdbPagination";
import { TMDBItem } from "@/lib/tmdb";

export function TmdbExplore() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";
  const page = searchParams.get("page") || "1";

  const [results, setResults] = useState<TMDBItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      setTotalPages(1);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(
      `/api/tmdb/search?query=${encodeURIComponent(searchQuery)}&page=${page}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch results");
        return response.json();
      })
      .then((data) => {
        setResults(data.data || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => {
        setResults([]);
        setTotalPages(1);
        setError("Failed to fetch results.");
      })
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  if (!searchQuery) return null;

  if (loading) {
    return <div className="my-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="my-8 text-center text-red-500">{error}</div>;
  }

  if (results.length === 0) {
    return <div className="my-8 text-center">No results found.</div>;
  }

  return (
    <>
      <TmdbItems items={results} />
      <TmdbPagination totalPages={totalPages} />
    </>
  );
}
