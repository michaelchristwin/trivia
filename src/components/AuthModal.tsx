import { useForm, SubmitHandler } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};
interface LoginFCProps {
  children: React.ReactNode;
  title: string;
}
function AuthModal({ children, title }: LoginFCProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Checks if status is not in the range of 200-299
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      setOpen(false);
      alert("Login Sucessful");

      console.log("Login successful", res);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const handleCancel = () => {
    reset();
  };
  console.log(watch("email"));
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={`border-0 h-[350px]`}>
        <AlertDialogHeader>
          <AlertDialogTitle className={`text-[23px] block mx-auto`}>
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`h-fit space-y-[30px] w-full`}
        >
          <div className={`w-full block space-y-[2px]`}>
            <Input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.email?.type === "required" && (
              <p role={"alert"} className={`text-[7px] ps-2 text-red-500`}>
                Email is required
              </p>
            )}
          </div>
          <div className={`w-full block space-y-[2px]`}>
            <Input
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter your password"
              className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.password?.type === "required" && (
              <p role="alert" className={`text-[7px] ps-2 text-red-500`}>
                Password is required
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type={"button"} onClick={handleCancel}>
              Cancel
            </AlertDialogCancel>
            <Button type={"submit"}>Signin</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AuthModal;
