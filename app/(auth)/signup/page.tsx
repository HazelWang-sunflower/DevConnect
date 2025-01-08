"use client";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Register() {
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
  };
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
        Sign up to DevConnect
      </h2>
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
                  <Input placeholder="User Name" {...field} />
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
                  <Input placeholder="Email" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button className="w-full" type="submit">
            Sign up
          </Button>
        </form>
      </Form>
      <div className="mt-8">
        <span>Already have an account? </span>
        <Button className="px-0 text-blue-800" variant="link">
          Log in
        </Button>
      </div>
    </div>
  );
}
