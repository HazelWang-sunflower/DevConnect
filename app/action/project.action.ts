"use server";
import { redirect } from "next/navigation";

export async function createProject(data: any, email: string) {
  const response = await fetch("http://localhost:3000/api/project", {
    method: "POST",
    body: JSON.stringify({ ...data, accountEmail: email }),
  });

  //   const res = await response.json();
  if (response.ok) {
    return response;
  } else {
    return { message: "Create Project failed! Please retry!" };
  }
}
