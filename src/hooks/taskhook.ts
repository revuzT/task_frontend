import { useMutation } from "@tanstack/react-query";
import { getAllTask, postTaskAPI } from "../services/taskServices";
import type { TaskSchema } from "../util/app.schema";

export function useGetAllTasks() {
  const { mutate, isPending } = useMutation({
    mutationFn: () => getAllTask(),
    onError: (res) => {
      console.log(res);
    },
  });
  return { mutate, isPending };
}

// postTaskAPI
export function usePostTasks() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: TaskSchema) => postTaskAPI(data),
    onError: (res) => {
      console.log(res);
    },
  });
  return { mutate, isPending };
}
