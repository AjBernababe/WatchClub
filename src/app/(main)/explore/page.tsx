import { SearchBar } from "@/components/explorePage/searchBar";
import { TmdbExplore } from "@/components/explorePage/tmdbExplore";
import { Suspense } from "react";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <SearchBar />
      <TmdbExplore />
    </Suspense>
  );
}
