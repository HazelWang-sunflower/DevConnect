import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";

async function login(email: string, password: string) {
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
  return user;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const data = await login(email, password);
  const user = { name: data?.username, email: data?.email };
  return NextResponse.json(user);
}
