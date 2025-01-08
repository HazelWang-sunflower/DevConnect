import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SigninForm } from "../../../components/signin-form";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="container">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
        Log in to DevConnect
      </h2>
      <SigninForm />
      <div className="flex justify-between mt-4 text-sm text-zinc-500 underline">
        <div>Forget your password?</div>
        <Link href="/signup" className="text-sm font-medium">
          <div>Create an account</div>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
