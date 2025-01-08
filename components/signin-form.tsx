"use client";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Icons } from "./ui/icons";

export function SigninForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formSchema = z.object({
    username: z.string().nonempty({ message: "Username is required." }),
    email: z.string().email({
      message: "Email is required.",
    }),
    password: z.string().min(6, {
      message: "Password is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        username: data.username,
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res.error);
        setError(`Authentication failed: ${res.error}`);
      }
      if (res?.ok) {
        router.push("/");
      }
    } catch (error) {
      setError(`Unexpected error during sign in: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid gap-6">
      <div className="mt-6">
        <Button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center bg-white border border-black text-gray-900"
        >
          <Icons.gitHub></Icons.gitHub>
          Sign in with GitHub
        </Button>
        <div className="relative flex justify-center text-sm my-8">
          <span className="px-2 text-gray-500">Or continue with</span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
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
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
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
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
