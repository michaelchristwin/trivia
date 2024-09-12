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
import { useAuthStore } from "./Profile";

type Inputs = {
  email: string;
  password: string;
};
interface AuthFCProps {
  children: React.ReactNode;
  title: "Login" | "Signup";
}
function AuthModal({ children, title }: AuthFCProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [open, setOpen] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`http://localhost:8080/${title.toLowerCase()}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Checks if status is not in the range of 200-299
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      if (title === "Login") {
        const data = await res.json();
        setUser({ user: { email: data.email }, isAuthenticated: true });
      }
      setOpen(false);

      alert("Action Sucessful");
      reset();
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
              <p role={"alert"} className={`text-[10px] ps-2 text-red-500`}>
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
              <p role="alert" className={`text-[10px] ps-2 text-red-500`}>
                Password is required
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type={"button"} onClick={handleCancel}>
              Cancel
            </AlertDialogCancel>
            <Button type={"submit"}>{title}</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AuthModal;
