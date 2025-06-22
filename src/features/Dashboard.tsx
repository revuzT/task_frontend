/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetAllTasks } from "../hooks/taskhook";
import AppSpinner from "../components/AppSpinner";
import { TASK_MANAGEMENT } from "../util/app.constants";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const [taskData, setTaskData] = useState<any>(undefined);
  const { mutate, isPending } = useGetAllTasks();

  useEffect(() => {
    if (!taskData && !isPending) {
      mutate(undefined, {
        onSuccess: (res) => {
          if (res?.status === "SUCCESS") {
            setTaskData(res?.data);
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
      {isPending && <AppSpinner />}
    </div>
  );
};

export default Dashboard;
