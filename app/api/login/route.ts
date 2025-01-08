import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { neon } from "@neondatabase/serverless";

async function login(email: string, password: string) {
  // if (!process.env.DATABASE_URL) {
  //   throw new Error("DATABASE_URL is not defined");
  // }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  console.log(user);
  return user;
  // const sql = neon(process.env.DATABASE_URL!);
  // //   const sql = `SELECT * FROM t_users WHERE email = ${email} AND password = ${password}`;
  // const data =
  //   await sql`SELECT * FROM t_user WHERE email = ${email} AND password = ${password}`;
  // return NextResponse.json(data[0]);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, username } = body;

  const user = await prisma.user.findUnique({
    select: {
      username: true,
      email: true,
    },
    where: {
      email: email,
      password: password,
    },
  });
  console.log("user", user);
  return NextResponse.json(user);
}
