"use client";

import type { TMDBItem } from "@/lib/tmdb";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function TMDBItemCard({
  id,
  title,
  image,
  type,
  rating,
  year,
}: TMDBItem) {
  return (
    <Card className="w-[200px] h-[300px] overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 p-0 flex flex-col">
      <div id={`${id}`} className="relative flex-1">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="200px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority={false}
        />

        <div className="absolute top-3 left-3 transition-transform duration-300 group-hover:scale-110">
          <Badge
            variant={type === "TV" ? "default" : "secondary"}
            className="text-xs font-medium shadow-lg backdrop-blur-sm"
          >
            {type}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-xs font-medium">{rating}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition-transform duration-300">
          <h3 className="font-semibold text-base mb-1 line-clamp-2 drop-shadow-lg [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
            {title}
          </h3>
          <p className="text-sm opacity-95 drop-shadow-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_60%)]">
            {year}
          </p>
        </div>
      </div>
    </Card>
  );
}
