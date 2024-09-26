import { createLazyFileRoute } from "@tanstack/react-router";
import useAuthStore from "@/context/auth.store";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { IoEyeOutline, IoEyeOff } from "react-icons/io5";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { useState } from "react";

export const Route = createLazyFileRoute("/signup")({
  component: SignupPage,
});

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });
  const password = watch("password");
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (InputData) => {
    const { confirmPassword, ...newInputData } = InputData;
    try {
      const res = await fetch(`http://localhost:8080/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInputData),
      });

      if (!res.ok) {
        // Checks if status is not in the range of 200-299
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setUser({ email: data.email });
      // alert("Action Sucessful");
      reset();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={`p-[40px] text-white w-[500px] block mx-auto`}>
      <h1 className={`text-[27px] font-bold text-center`}>Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`h-fit space-y-[40px] py-[30px] rounded w-[100%] block mx-auto`}
      >
        <div className={`w-full block space-y-[2px]`}>
          <FloatingLabelInput
            label="First name"
            {...register("firstName", { required: true })}
            type="text"
            id="firstName"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
          {errors.firstName?.type === "required" && (
            <p role={"alert"} className={`text-[10px] ps-2 text-red-500`}>
              First name is required
            </p>
          )}
        </div>
        <div className={`w-full block space-y-[2px]`}>
          <FloatingLabelInput
            label="Last name"
            {...register("lastName", { required: true })}
            type="text"
            id="lastName"
            placeholder=""
            aria-invalid={errors.lastName ? "true" : "false"}
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
          {errors.lastName?.type === "required" && (
            <p role={"alert"} className={`text-[10px] ps-2 text-red-500`}>
              Last name is required
            </p>
          )}
        </div>
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
        <div className={`w-full block space-y-[2px] relative`}>
          {showConfirmPassword ? (
            <IoEyeOff
              role="button"
              className={`absolute top-[15px] right-2 z-20`}
              onClick={() => setShowConfirmPassword((p) => !p)}
            />
          ) : (
            <IoEyeOutline
              role="button"
              className={`absolute top-[15px] right-2 z-20`}
              onClick={() => setShowConfirmPassword((p) => !p)}
            />
          )}
          <FloatingLabelInput
            label="Confirm password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />

          {errors.confirmPassword && (
            <p role="alert" className={`text-[10px] ps-2 text-red-500`}>
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className={`block bg-neutral-600 hover:text-black text-white mx-auto`}
        >
          Sign Up
        </Button>
      </form>
      <Link
        to="/login"
        className={`text-[13px] text-center cursor-pointer underline block mx-auto`}
      >
        Already have an account
      </Link>
    </div>
  );
}
