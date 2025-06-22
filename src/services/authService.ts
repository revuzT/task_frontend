import type { LoginForm, RegisterForm } from "../util/app.schema";
import { postRequest } from "./apiServices";

export function loginFnAPI(data: LoginForm) {
  return postRequest("auth/login", data);
}

export function registerFnAPI(data: RegisterForm) {
  return postRequest("auth/register", data);
}
