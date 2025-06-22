/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";

export const taskColumns: ColumnDef<any>[] = [
  {
    accessorKey: "taskName",
    header: "Task Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => new Date(info.getValue() as string).toLocaleString(),
  },
];
