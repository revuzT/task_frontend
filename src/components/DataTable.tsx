/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort } from "react-icons/fa";
import Pagination from "./Pagination.tsx";
import { useEffect, useState } from "react";

type FilterData = {
  searchCol: string;
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
};

type Props<T> = {
  data: T[];
  columns: (ColumnDef<T, any> & { sort?: boolean })[];
  filterData: FilterData;
  setFilterData: (data: FilterData) => void;
  totalItems: number;
};

const DataTable = <T extends object>({
  data,
  columns,
  filterData,
  setFilterData,
  totalItems,
}: Props<T>) => {
  const handleSort = (colId: string) => {
    const isCurrent = filterData.searchCol === colId;
    const newOrder =
      isCurrent && filterData.sortOrder === "asc" ? "desc" : "asc";
    setFilterData({
      ...filterData,
      searchCol: colId,
      sortOrder: newOrder,
      page: 0,
    });
  };

  const totalPages = Math.ceil(totalItems / filterData.pageSize || 1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 400);
    return () => clearTimeout(timeout);
  }, [filterData.page]);

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: filterData.page,
        pageSize: filterData.pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="relative w-full shadow-md sm:rounded-lg font-jura h-full overflow-visible">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="uppercase bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const colId = header.column.id;
                const showSort = (header.column.columnDef as any).sort;

                return (
                  <th
                    key={header.id}
                    className={`px-6 py-3 ${
                      showSort ? "cursor-pointer select-none" : ""
                    }`}
                    onClick={() => showSort && handleSort(colId)}
                  >
                    <div className="flex items-center gap-1 text-primary">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {showSort && <FaSort className="ml-1" />}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody
          className={`text-black font-bold transition-all duration-500 ease-in-out ${
            animate ? "animate-fadeSlide" : ""
          }`}
        >
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-third w-full">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-4 py-3 sm:px-6 text-primary">
        <div className="flex items-center justify-between flex-col sm:flex-row">
          <p className="text-sm mb-2 sm:mb-0">
            Page{" "}
            <span className="font-medium">
              {isNaN(filterData.page) ? 1 : filterData.page + 1}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {isNaN(totalPages) ? 1 : totalPages}
            </span>
          </p>
          <Pagination
            page={filterData.page}
            totalPages={totalPages}
            setPage={(p) => setFilterData({ ...filterData, page: p })}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
