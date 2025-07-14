import { searchTMDB } from "@/lib/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("query") || "";
  const page = request.nextUrl.searchParams.get("page") || "1";

  const TMDBResponse = await searchTMDB(searchQuery, page);

  return NextResponse.json(TMDBResponse);
}
