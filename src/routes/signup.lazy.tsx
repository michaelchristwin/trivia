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
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm<Inputs>();

  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (InputData) => {
    const { confirm_password, ...newInputData } = InputData;
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

  console.log(watch("email"));
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
            {...register("first_name", { required: true })}
            type="text"
            id="first_name"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
          {errors.first_name?.type === "required" && (
            <p role={"alert"} className={`text-[10px] ps-2 text-red-500`}>
              First name is required
            </p>
          )}
        </div>
        <div className={`w-full block space-y-[2px]`}>
          <FloatingLabelInput
            label="Last name"
            {...register("last_name", { required: true })}
            type="text"
            id="last_name"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
          {errors.last_name?.type === "required" && (
            <p role={"alert"} className={`text-[10px] ps-2 text-red-500`}>
              Last name is required
            </p>
          )}
        </div>
        <div className={`w-full block space-y-[2px]`}>
          <FloatingLabelInput
            label="Email"
            {...register("email", { required: true })}
            type="email"
            id="email"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
          {errors.email?.type === "required" && (
            <p role={"alert"} className={`text-[10px] ps-2 text-red-500`}>
              Email is required
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
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
          {errors.password?.type === "required" && (
            <p role="alert" className={`text-[10px] ps-2 text-red-500`}>
              Password is required
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
            {...register("confirm_password", { required: true })}
            type={showConfirmPassword ? "text" : "password"}
            id="confirm_password"
            placeholder=""
            className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
          />
          {errors.password?.type === "required" && (
            <p role="alert" className={`text-[10px] ps-2 text-red-500`}>
              Password is required
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
