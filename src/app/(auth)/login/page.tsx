"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const formSchema = z.object({
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
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    console.log("res", res);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
        Log in to DevConnect
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <div className="relative flex justify-center text-sm mt-6">
        <span className="px-2 text-gray-500">Or continue with</span>
      </div>
      <div className="mt-6">
        <Button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center bg-white border border-black text-gray-900"
        >
          <Github className="w-5 h-5 mr-2" />
          Sign in with GitHub
        </Button>
        {/* <LoginWithoutAuth /> */}
      </div>
      <div className="flex justify-between mt-4 text-sm text-zinc-500 underline">
        <div>Forget your password?</div>
        <Link href="/register" className="text-sm font-medium">
          <div>Create an account</div>
        </Link>
      </div>
    </div>
  );
}
