"use client";

import { TMDBItem } from "@/lib/tmdb";
import { TmdbItem } from "../shared/tmdbItem";

export function TmdbItems({ items }: { items: TMDBItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 my-8">
      {items.map((item) => (
        <TmdbItem key={item.id} {...item} />
      ))}
    </div>
  );
}
