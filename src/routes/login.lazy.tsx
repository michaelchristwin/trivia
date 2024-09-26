import useAuthStore from "@/context/auth.store";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { useState } from "react";
import { IoEyeOff, IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});
type Inputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (InputData) => {
    try {
      const res = await fetch(`http://localhost:8080/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(InputData),
      });

      if (!res.ok) {
        // Checks if status is not in the range of 200-299
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
      setUser({ email: data.data.email });
      toast.success(`Welcome back ${data.data.FirstName} 👋`, {
        position: "top-center",
      });
      reset();
      navigate({ to: "/" });
    } catch (error) {
      toast.error("Login failed", {
        position: "top-center",
      });
      console.error("Login failed", error);
    }
  };

  console.log(watch("email"));
  return (
    <div className={`p-[40px] text-white w-[500px] block mx-auto`}>
      <h1 className={`text-[27px] font-bold text-center`}>Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`h-fit space-y-[40px] py-[30px] rounded w-[100%] block mx-auto`}
      >
        <div className={`w-full block space-y-[2px]`}>
          <FloatingLabelInput
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
          {errors.email && (
            <p role={"alert"} className={`text-[10px] ps-2 text-red-500`}>
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className={`w-full block space-y-[2px] relative`}>
          {showPassword ? (
            <IoEyeOff
              className={`absolute top-[15px] right-2 z-20`}
              role="button"
              onClick={() => setShowPassword((p) => !p)}
            />
          ) : (
            <IoEyeOutline
              className={`absolute top-[15px] right-2 z-20`}
              role="button"
              onClick={() => setShowPassword((p) => !p)}
            />
          )}

          <FloatingLabelInput
            label="Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,}$/,
                message:
                  "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />

          {errors.password && (
            <p role="alert" className={`text-[10px] ps-2 text-red-500`}>
              {errors.password?.message}
            </p>
          )}
        </div>
        <Button type="submit" className={`block mx-auto`}>
          Login
        </Button>
      </form>
      <Link
        to="/signup"
        className={`text-[13px] text-center cursor-pointer underline block mx-auto`}
      >
        Don't have an account
      </Link>
    </div>
  );
}
