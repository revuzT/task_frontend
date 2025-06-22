import { MdArrowRight, MdOutlineArrowLeft } from "react-icons/md";

type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

type PaginationRange = (number | "...")[];

const Pagination = ({ page, totalPages, setPage }: Props) => {
  const getPaginationRange = (
    currentPage: number,
    totalPageCount: number
  ): PaginationRange => {
    if (totalPageCount <= 5) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    if (currentPage === 1 || currentPage === totalPageCount) {
      return [1, "...", totalPageCount];
    }

    if (currentPage === 2) {
      return [2, "...", totalPageCount];
    }

    if (currentPage === totalPageCount - 1) {
      return [1, "...", currentPage, totalPageCount];
    }

    return [currentPage, "...", totalPageCount];
  };

  const paginationRange = getPaginationRange(page + 1, totalPages);

  return (
    <nav className="flex items-center space-x-1">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
        className="px-2 py-2 border rounded disabled:opacity-50"
      >
        <MdOutlineArrowLeft />{" "}
      </button>

      {paginationRange.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={`page-${p}-${i}`}
            onClick={() => setPage(p - 1)}
            className={`px-3 py-1 rounded border ${
              p - 1 === page ? "bg-third text-white" : "text-gray-700"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page + 1 >= totalPages}
        className="p-2 border rounded disabled:opacity-50"
      >
        <MdArrowRight />
      </button>
    </nav>
  );
};

export default Pagination;
