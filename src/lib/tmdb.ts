const API_KEY = process.env.TMDB_API_KEY;

export type TMDBItem = {
  id: number;
  title: string;
  overview: string;
  image: string;
  type: "TV" | "Movie";
  year: string;
  rating: number;
  link: string;
};

export function mapTMDBItem(item: any): TMDBItem {
  return {
    id: item.id,
    title: item.title || item.name,
    overview: item.overview,
    image: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : `https://placehold.co/500x750.jpg?font=inter&text=?`,
    type: item.media_type === "tv" ? "TV" : "Movie",
    year:
      item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0],
    rating: item.vote_average.toFixed(1) || "0",
    link: `https://www.themoviedb.org/${item.media_type}/${item.id}`,
  };
}

type TMDBResponse = {
  data: TMDBItem[];
  totalPages: number;
};

export async function searchTMDB(
  query: string,
  page: string
): Promise<TMDBResponse> {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&page=${page}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  const data = await res.json();
  console.log("TMDB search results:", data);

  const results = data.results.filter(
    (item: { media_type: string }) =>
      item.media_type === "movie" || item.media_type === "tv"
  );

  return {
    data: results.map(mapTMDBItem),
    totalPages: data.total_pages,
  };
}
