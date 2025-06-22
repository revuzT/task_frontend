import type { TaskSchema } from "../util/app.schema";
import { getRequest, postRequest } from "./apiServices";

export function getAllTask() {
  return getRequest("task");
}

export function postTaskAPI(data: TaskSchema) {
  return postRequest("task", data);
}
