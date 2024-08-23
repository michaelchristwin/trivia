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

function Login({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    if (Object.values(formData).length === 0) {
      return;
    }
    try {
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
      <AlertDialogContent className={`border-0 space-y-4`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Login2</AlertDialogTitle>
        </AlertDialogHeader>

        <Input
          type="text"
          onChange={handleChange}
          value={email}
          name="email"
          placeholder="Enter your email"
          className={`focus:border-0`}
        />
        <Input
          type="text"
          onChange={handleChange}
          name="password"
          value={password}
          placeholder="Enter your password"
          className={`focus:border-0`}
        />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="button" onClick={handleSubmit}>
            Login
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Login;
