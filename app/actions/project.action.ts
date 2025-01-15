"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createProject = async (data: any, email: string) => {
  // try {
  await prisma.project.create({
    data: {
      name: data.name,
      accountEmail: email,
      desc: data.desc,
      url: data.url,
    },
  });
  revalidatePath("/projects");
  // } catch (e) {
  //   return { error: e };
  // }
};
