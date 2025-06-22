import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { REMEMBER_ME, SIGN_IN, SIGN_UP } from "../util/app.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterForm } from "../util/app.schema";
import { useRegister } from "../hooks/authhook";
import AppSpinner from "../components/AppSpinner";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();

  const handleSignInClick = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    mutate(data, {
      onSuccess: (res) => {
        if (res?.status === "SUCCESS") {
          navigate("/dashboard");
          toast(res?.message || res?.data?.[0]?.message);
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
        placeholder="Min 8 characters"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Min 8 characters"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
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
          onClick={handleSignInClick}
        >
          {SIGN_IN}
        </button>
      </div>
      <Button type="submit">{SIGN_UP}</Button>
      {isPending && <AppSpinner />}
    </form>
  );
};

export default RegisterPage;
