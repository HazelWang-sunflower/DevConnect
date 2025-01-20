"use client";

import React from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "components/ui/button";
import { Icons } from "components/ui/icons";
import { Input } from "components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

export function SigninForm() {
  const router = useRouter();

  const formSchema = z.object({
    username: z.string().nonempty({ message: "Username is required." }),
    email: z.string().email({
      message: "Email is required.",
    }),
    password: z.string().min(6, {
      message: "Password is required.",
    }),
  });

  type TSigninFormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSigninFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <Input
            {...register("username")}
            placeholder="User Name"
            disabled={isSubmitting}
          />
          <Input
            {...register("email")}
            placeholder="Email"
            disabled={isSubmitting}
          />
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            disabled={isSubmitting}
          />
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
