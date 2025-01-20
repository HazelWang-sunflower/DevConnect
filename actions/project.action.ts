"use server";

import { prisma } from "lib/prisma";
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

export const deleteProject = async (id: number) => {
  await prisma.project.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/projects");
};

export const updateProject = async (data: any, id: number) => {
  await prisma.project.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      accountEmail: data.email,
      desc: data.desc,
      url: data.url,
    },
  });
  revalidatePath("/projects");
};

export const fetchProject = async (id: number) => {
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });
  return project;
};
