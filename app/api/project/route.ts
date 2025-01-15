import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function findProjectsByEmail(email: string) {
  const projects = await prisma.project.findMany({
    where: {
      accountEmail: email,
    },
  });
  console.log("projects", projects);
  return projects;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  if (email) {
    const data = await findProjectsByEmail(email);
    return NextResponse.json(data);
  }
  return NextResponse.json({ error: "userId is required" }, { status: 400 });
}

async function createProject(params: {
  name: string;
  email: string;
  desc: string;
  url: string;
}) {
  const res = await prisma.project.create({
    data: {
      name: params.name,
      accountEmail: params.email,
      desc: params.desc,
      url: params.url,
    },
  });
  console.log("res", res);
  return res;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await createProject(body);
  return NextResponse.json(data);
}
