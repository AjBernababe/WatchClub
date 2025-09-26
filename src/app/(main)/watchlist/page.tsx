import fetchWatchlist from "@/actions/main/fetchWatchlist";
import { WatchlistMain } from "@/components/watchlistPage/watchlistMain";

export default async function WatchlistPage() {
  const watchlistData = await fetchWatchlist();

  return <WatchlistMain watchlistData={watchlistData} />;
}
