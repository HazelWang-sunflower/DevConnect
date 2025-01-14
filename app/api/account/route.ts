import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function updateUserName(name: string, email: string) {
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      username: name,
    },
  });
  return user;
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email } = body;
  const data = await updateUserName(name, email);
  console.log("update", data);
  return NextResponse.json(data);
}
