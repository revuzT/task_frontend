/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useGetAllTasks } from "../hooks/taskhook";
import AppSpinner from "../components/AppSpinner";
import { PAGE_SIZE, TASK_MANAGEMENT } from "../util/app.constants";
import { Plus } from "lucide-react";
import DataTable from "../components/DataTable";
import { taskColumns } from "./TaskColumns";

type FilterData = {
  searchCol: string;
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
};

const Dashboard = () => {
  const [taskData, setTaskData] = useState<any[]>([]); // ✅ initialized as an array
  const { mutate, isPending } = useGetAllTasks();

  const [filterData, setFilterData] = useState<FilterData>({
    searchCol: "",
    sortOrder: "asc",
    page: 0,
    pageSize: PAGE_SIZE,
  });

  // ✅ Safely sort only when data exists
  const sortedData = useMemo(() => {
    if (!Array.isArray(taskData)) return [];

    const sorted = [...taskData];
    const { searchCol, sortOrder } = filterData;

    if (searchCol) {
      sorted.sort((a, b) => {
        const aVal = a[searchCol as keyof typeof a];
        const bVal = b[searchCol as keyof typeof b];

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sorted;
  }, [taskData, filterData]);

  // ✅ Safe pagination
  const paginatedData = useMemo(() => {
    const start = filterData.page * filterData.pageSize;
    const end = start + filterData.pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, filterData]);

  useEffect(() => {
    if (taskData.length === 0 && !isPending) {
      mutate(undefined, {
        onSuccess: (res) => {
          if (res?.status === "SUCCESS" && Array.isArray(res.data)) {
            setTaskData(res.data);
          }
        },
      });
    }
  }, [isPending, mutate, taskData]);

  return (
    <div className="h-screen font-primary flex flex-col">
      <div className="px-5 pt-5 md:px-10 md:pt-10">
        <h2 className="text-primary text-[36px] font-semibold">
          {TASK_MANAGEMENT}
        </h2>
      </div>

      <div className="w-full flex justify-end px-4">
        <button className="flex border-2 border-white bg-primary rounded-full text-white p-4 items-center px-7">
          Add <Plus className="ml-2 w-4 h-4" />
        </button>
      </div>

      <div>
        <DataTable
          data={paginatedData}
          columns={taskColumns}
          filterData={filterData}
          setFilterData={setFilterData}
          totalItems={taskData.length}
        />
      </div>

      {isPending && <AppSpinner />}
    </div>
  );
};

export default Dashboard;
