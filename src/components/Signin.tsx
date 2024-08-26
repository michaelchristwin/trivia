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
export interface FormError {
  email: string;
  password: string;
}
function Signin({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [errors, setErrors] = useState<FormError>({ email: "", password: "" });
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      if (!validate()) {
        throw Error("form data is invalid");
      }
      const res = await fetch("http://localhost:8080/signin", {
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
      alert("Account Created");
      setFormData({ email: "", password: "" });
      const data = await res.json(); // Assuming the response is in JSON
      console.log("Login successful", data);
    } catch (error) {
      console.error("Signin failed", error);
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
            Signin
          </AlertDialogTitle>
        </AlertDialogHeader>

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
            <p className={`text-[7px] ps-2 text-red-500`}>{errors.password}</p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <Button type="button" onClick={handleSubmit}>
            Signin
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Signin;
