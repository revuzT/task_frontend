import { getRequest } from "./apiServices";

export function getAllTask() {
  return getRequest("task");
}
