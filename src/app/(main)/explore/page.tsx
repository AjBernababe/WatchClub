import { ExploreMain } from "@/components/explorePage/exploreMain";
import fetchWatchlistIds from "@/actions/main/fetchWatchlistIds";

export default async function ExplorePage() {
  const watchlistIds = await fetchWatchlistIds();

  return <ExploreMain watchlistIds={watchlistIds} />;
}
