import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

async function login(email: string, password: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }
  const sql = neon(process.env.DATABASE_URL!);
  //   const sql = `SELECT * FROM t_users WHERE email = ${email} AND password = ${password}`;
  const data =
    await sql`SELECT * FROM t_user WHERE email = ${email} AND password = ${password}`;
  return NextResponse.json(data[0]);
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("request", email);
  return login(email, password);
}
