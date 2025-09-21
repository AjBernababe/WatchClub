export const API_KEY = process.env.TMDB_API_KEY;

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export type TMDBItem = {
  id: number;
  title: string;
  image: string;
  type: "TV" | "Movie";
  year: string;
  rating: number;
};

export function mapTMDBItem(item: any): TMDBItem {
  return {
    id: item.id,
    title: item.title || item.name,
    image: item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : `https://placehold.co/500x750.jpg?font=inter&text=?`,
    type: item.media_type === "tv" ? "TV" : "Movie",
    year:
      item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0],
    rating: item.vote_average.toFixed(1),
  };
}

export type TMDBSearchResponse = {
  items: TMDBItem[];
  page: number;
  total_pages: number;
};
