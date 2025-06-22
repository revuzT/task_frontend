/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import { taskSchema, type TaskSchema } from "../util/app.schema";
import { useForm } from "react-hook-form";
import { usePostTasks } from "../hooks/taskhook";
import AppSpinner from "../components/AppSpinner";
import toast from "react-hot-toast";

function AddForm({ setIsOpen }: any) {
  const { mutate, isPending } = usePostTasks();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskSchema) => {
    mutate(data, {
      onSuccess: (res) => {
        if (res?.status === "SUCCESS") {
          setIsOpen(false);
          setTimeout(() => {
            toast(res?.message);
          }, 100);
        }
      },
    });
  };

  return (
    <div className="md:w-[35vw] max-h-[87vh]">
      <h2 className="text-2xl font-semibold text-center mb-2 text-primary font-kanit">
        Add Task
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Enter Task Name" {...register("taskName")} />
          {errors.taskName && (
            <p className="text-red-500 text-sm">{errors.taskName.message}</p>
          )}
        </div>

        <div>
          <Input placeholder="Description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Input {...register("dueDate")} />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      {isPending && <AppSpinner />}
    </div>
  );
}

export default AddForm;
