import React, { useMemo } from "react";
import { PaginationInterface } from "../../interfaces";
import { Button } from "../button";

interface PaginationParams<T> {
  pagination: PaginationInterface<T>;
  reloadItens: (page: number) => void;
  showTotal?: boolean;
}

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export const Pagination: React.FC<PaginationParams<any>> = ({
  pagination,
  reloadItens,
  showTotal,
}) => {
  let totalRecords = pagination.totalPages,
    pageLimit = pagination.numberOfElements,
    pageNeighbours = 3;
  pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
  totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

  // pageNeighbours can be: 0, 1 or 2
  pageNeighbours =
    typeof pageNeighbours === "number"
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 3;

  const totalPages = pagination.totalPages;
  const fetchPageNumbers = () => {
    const currentPage = pagination.number;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages: Array<string | number> = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };
  const goToPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    reloadItens(currentPage - 1);
  };

  const arrayPages = useMemo(() => fetchPageNumbers(), [pagination]);

  return (
    <nav
      className={`mt-5 ${
        showTotal && "flex flex-col  justify-center items-center"
      }`}
    >
      <div className="flex">
        {arrayPages.map((_pag) => {
          const pos: any = _pag;
          return (
            <Button
              btnLabel={pos}
              onClick={() => goToPage(pos)}
              key={pos}
              extraCss="p-0 mx-1"
            />
          );
        })}
      </div>
      {showTotal && (
        <span className="mb-3 mt-2">
          Mostrando:
          {pagination.totalPages
            ? ` ${pagination.numberOfElements}/${pagination.totalElements}`
            : " 0/0"}
        </span>
      )}
    </nav>
  );
};
