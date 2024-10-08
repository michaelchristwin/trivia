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
import { FormError } from "./Signin";

function Login({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [errors, setErrors] = useState<FormError>({ email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validate = () => {
    const errors: FormError = { email: "", password: "" };

    // Check email format
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }

    // Check password length
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };
  const handleSubmit = async () => {
    try {
      if (!validate()) {
        throw Error("form data is invalid");
      }
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Checks if status is not in the range of 200-299
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      setOpen(false);
      alert("Login Sucessful");
      setFormData({ email: "", password: "" });

      console.log("Login successful", res);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const handleCancel = () => {
    setErrors({ email: "", password: "" });
    setFormData({ email: "", password: "" });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={`border-0 h-[350px]`}>
        <AlertDialogHeader>
          <AlertDialogTitle className={`text-[23px] block mx-auto`}>
            Login
          </AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className={`h-fit space-y-[30px] w-full`}>
          <div className={`w-full block space-y-[2px]`}>
            <Input
              type="email"
              onChange={handleChange}
              value={email}
              name="email"
              placeholder="Enter your email"
              className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.email && (
              <p className={`text-[7px] ps-2 text-red-500`}>{errors.email}</p>
            )}
          </div>
          <div className={`w-full block space-y-[2px]`}>
            <Input
              type="password"
              onChange={handleChange}
              name="password"
              value={password}
              placeholder="Enter your password"
              className={`h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0`}
            />
            {errors.password && (
              <p className={`text-[7px] ps-2 text-red-500`}>
                {errors.password}
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

export default Login;
