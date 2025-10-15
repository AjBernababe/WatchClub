import { NextRequest, NextResponse } from "next/server";
import {
  API_KEY,
  TMDB_BASE_URL,
  mapTMDBItem,
  TMDBSearchResponse,
} from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = (searchParams.get("searchQuery") || "").trim();
    const page = searchParams.get("page") || "1";

    const q = encodeURIComponent(searchQuery);
    const movieUrl = `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${q}&page=${page}`;
    const tvUrl = `${TMDB_BASE_URL}/search/tv?api_key=${API_KEY}&query=${q}&page=${page}`;

    const [movieRes, tvRes] = await Promise.all([
      fetch(movieUrl),
      fetch(tvUrl),
    ]);

    if (!movieRes.ok || !tvRes.ok) {
      throw new Error("Failed to fetch data from TMDB");
    }

    const [movieData, tvData] = await Promise.all([
      movieRes.json(),
      tvRes.json(),
    ]);

    const movies = (movieData.results || []).map((r: any) => ({
      ...r,
      media_type: "movie",
    }));
    const tvShows = (tvData.results || []).map((r: any) => ({
      ...r,
      media_type: "tv",
    }));

    const combined = [...movies, ...tvShows]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .map(mapTMDBItem);

    const total_pages = Math.max(
      Number(movieData.total_pages || 0),
      Number(tvData.total_pages || 0)
    );

    const response: TMDBSearchResponse = {
      items: combined,
      page: Number(page),
      total_pages,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
