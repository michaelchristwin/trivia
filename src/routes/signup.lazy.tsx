import { createLazyFileRoute } from "@tanstack/react-router";
import useAuthStore from "@/context/auth.store";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import FloatingLabelInput from "@/components/FloatingLabelInput";

export const Route = createLazyFileRoute("/signup")({
  component: SignupPage,
});

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
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
  const onSubmit: SubmitHandler<Inputs> = async (InputData) => {
    try {
      const res = await fetch(`http://localhost:8080/signup`, {
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
      setUser({ email: data.email });

      alert("Action Sucessful");
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
        <div className={`w-full block space-y-[2px]`}>
          <FloatingLabelInput
            label="Password"
            {...register("password", { required: true })}
            type="password"
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
