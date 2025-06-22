import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { REMEMBER_ME, SIGN_IN, SIGN_UP } from "../util/app.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginForm } from "../util/app.schema";
import { useLogin } from "../hooks/authhook";
import AppSpinner from "../components/AppSpinner";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  const { setIsAuthenticated } = useAuth();

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Form submitted:", data);
    mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        if (res?.status === "SUCCESS") {
          toast(res?.message);
          sessionStorage.setItem("encryptedEmail", res?.data?.email);
          setIsAuthenticated(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          toast(res?.message || res?.data?.[0]?.message);
        }
      },
    });
  };

  return (
    <form
      className="space-y-2.5 w-full"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Input
        id="email"
        label="Email"
        placeholder="@Email"
        error={errors.email?.message}
        {...register("email")}
      />{" "}
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Password"
        error={errors?.password?.message}
        {...register("password")}
      />
      <div className="flex w-full justify-between items-center text-white text-sm px-1 mb-5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border border-white accent-white"
            {...register("remember")}
          />
          {REMEMBER_ME}
        </label>
        <button
          className="font-semibold cursor-pointer"
          onClick={handleSignUpClick}
        >
          {SIGN_UP}
        </button>
      </div>
      <Button type="submit">{SIGN_IN}</Button>
      {isPending && <AppSpinner />}
    </form>
  );
};

export default LoginPage;
