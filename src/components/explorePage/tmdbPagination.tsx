"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function getPageNumbers(current: number, total: number, max = 5): number[] {
  const half = Math.floor(max / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + max - 1);
  if (end - start < max - 1) {
    start = Math.max(1, end - max + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function TmdbPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = searchParams.get("page");
  const currentPage = Math.max(1, Number(pageParam) || 1);

  // Helper to update a query param
  function buildHref(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage === 1) params.delete("page");
    else params.set("page", String(newPage));
    return `${pathname}?${params.toString()}`;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    router.push(buildHref(page));
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage === 1}
            onClick={(e) =>
              currentPage === 1
                ? e.preventDefault()
                : handlePageClick(e, currentPage - 1)
            }
          />
        </PaginationItem>
        {pageNumbers.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              href={buildHref(num)}
              isActive={num === currentPage}
              onClick={(e) => handlePageClick(e, num)}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={buildHref(Math.min(totalPages, currentPage + 1))}
            aria-disabled={currentPage === totalPages}
            onClick={(e) =>
              currentPage === totalPages
                ? e.preventDefault()
                : handlePageClick(e, currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
