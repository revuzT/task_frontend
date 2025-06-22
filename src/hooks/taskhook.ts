import { useMutation } from "@tanstack/react-query";
import { getAllTask } from "../services/taskServices";

export function useGetAllTasks() {
  const { mutate, isPending } = useMutation({
    mutationFn: () => getAllTask(),
    onError: (res) => {
      console.log(res);
    },
  });
  return { mutate, isPending };
}
