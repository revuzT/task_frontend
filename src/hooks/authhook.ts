import { useMutation } from "@tanstack/react-query";
import type { LoginForm, RegisterForm } from "../util/app.schema";
import { loginFnAPI, registerFnAPI } from "../services/authService";

export function useLogin() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginForm) => loginFnAPI(data),
    onError: (res) => {
      console.log(res);
    },
  });
  return { mutate, isPending };
}

export function useRegister() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterForm) => registerFnAPI(data),
    onError: (res) => {
      console.log(res);
    },
  });
  return { mutate, isPending };
}
