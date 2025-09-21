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
    const searchQuery = searchParams.get("searchQuery") || "";
    const page = searchParams.get("page") || "1";

    const url = `${TMDB_BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
      searchQuery
    )}&page=${page}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch data from TMDB");
    }

    const data = await res.json();

    const results = data.results.filter(
      (item: { media_type: string }) =>
        item.media_type === "movie" || item.media_type === "tv"
    );

    return NextResponse.json(
      {
        items: results.map(mapTMDBItem),
        page: data.page,
        total_pages: data.total_pages,
      } as TMDBSearchResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
