import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
async function signup(username: string, email: string, password: string) {
  const data = prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
  return data;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missging required fields" },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await signup(username, email, password);

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error("Error in signup API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
