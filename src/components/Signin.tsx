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
interface FormError {
  email: string;
  password: string;
}
function Signin({ children }: { children: React.ReactNode }) {
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
    return Object.keys(errors).length === 0;
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
      setFormData({ email: "", password: "" });
      const data = await res.json(); // Assuming the response is in JSON
      console.log("Login successful", data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={`border-0 h-[300px]`}>
        <AlertDialogHeader>
          <AlertDialogTitle className={`text-[20px]`}>Signin</AlertDialogTitle>
        </AlertDialogHeader>

        <div>
          <Input
            type="text"
            onChange={handleChange}
            value={email}
            name="email"
            placeholder="Enter your email"
            className={`focus-visible:`}
          />
          {errors.email && (
            <p className={`text-[7px] text-red-500`}>{errors.email}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            onChange={handleChange}
            name="password"
            value={password}
            placeholder="Enter your password"
            className={`focus:border-0`}
          />
          {errors.password && (
            <p className={`text-[7px] text-red-500`}>{errors.password}</p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="button" onClick={handleSubmit}>
            Signin
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Signin;
