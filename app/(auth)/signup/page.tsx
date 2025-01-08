"use client";

import { Icons } from "@/components/ui/icons";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formSchema = z.object({
    username: z.string().nonempty({ message: "Username is required." }),
    email: z.string().email({
      message: "Email is required.",
    }),
    password: z.string().length(6, {
      message: "Minimun length should be 6.",
    }),
    confirmPassword: z.string().length(6, {
      message: "Minimun length should be 6.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setIsLoading(true);
    setError("");
    const response = await fetch("http://localhost:3000/api/signUp", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(response);
    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      setError(data.error);
      // throw new Error(data.error || "Registration failed");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
        Sign up to DevConnect
      </h2>
      <p className="text-sm text-muted-foreground">
        Enter your details below to create your account
      </p>
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="User Name"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="confirmPassword"
            rules={{
              required: "Please confirm your password",
              validate: (value) => {
                if (value !== form.getValues("password")) {
                  return "Passwords do not match.";
                }
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>
        </form>
      </Form>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="mt-8">
        <span>Already have an account? </span>
        <Button className="px-0 text-blue-800" variant="link">
          Log in
        </Button>
      </div>
    </div>
  );
}
