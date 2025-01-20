import { prisma } from "lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function findPostByEmali(email: string) {
  const post = await prisma.post.findMany({
    where: {
      accountEmail: email,
    },
  });
  return post;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (email) {
    const data = await findPostByEmali(email);
    return NextResponse.json(data);
  }
  return NextResponse.json({ error: "email is required" }, { status: 400 });
}
