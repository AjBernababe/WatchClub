import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from "@/hooks/use-mobile";

type ExplorePaginationProps = {
  page: number;
  pageCount: number;
  searchQuery: string;
  handleTMDBSearch: (searchQuery: string, page: number) => Promise<void>;
};

export function ExplorePagination({
  page,
  pageCount,
  searchQuery,
  handleTMDBSearch,
}: ExplorePaginationProps) {
  const handlePageClick = (pageNum: number) => {
    if (pageNum === page) return;

    handleTMDBSearch(searchQuery, pageNum);
  };

  const generatePaginationItems = () => {
    const isMobile = useIsMobile();

    const paginationItems: (number | "ellipsis")[] = [];
    const maxVisiblePages = isMobile ? 7 : 11;

    if (pageCount <= maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        paginationItems.push(i);
      }
    } else {
      let startPage: number;
      let endPage: number;

      paginationItems.push(1);

      if (isMobile) {
        if (page <= 4) {
          startPage = 2;
          endPage = 5;
          for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(i);
          }
          paginationItems.push("ellipsis");
        } else if (page >= pageCount - 3) {
          paginationItems.push("ellipsis");
          startPage = pageCount - 4;
          endPage = pageCount - 1;
          for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(i);
          }
        } else {
          paginationItems.push("ellipsis");
          startPage = page - 1;
          endPage = page + 1;
          for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(i);
          }
          paginationItems.push("ellipsis");
        }
      } else {
        if (page <= 6) {
          startPage = 2;
          endPage = 9;
          for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(i);
          }
          paginationItems.push("ellipsis");
        } else if (page >= pageCount - 5) {
          paginationItems.push("ellipsis");
          startPage = pageCount - 8;
          endPage = pageCount - 1;
          for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(i);
          }
        } else {
          paginationItems.push("ellipsis");
          startPage = page - 3;
          endPage = page + 3;
          for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(i);
          }
          paginationItems.push("ellipsis");
        }
      }

      paginationItems.push(pageCount);
    }

    return paginationItems;
  };

  const paginationItems = generatePaginationItems();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) handlePageClick(page - 1);
            }}
            className={
              page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Pagination items */}
        {paginationItems.map((item, index) => (
          <PaginationItem key={index}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(item);
                }}
                isActive={item === page}
                className="cursor-pointer"
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < pageCount) handlePageClick(page + 1);
            }}
            className={
              page >= pageCount
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
