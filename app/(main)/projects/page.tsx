import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProjectActions from "./components/projectActions";
import ProjectCard from "./components/projectCard";
import Link from "next/link";

export default async function Projects() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const projects = await prisma.project.findMany({
    where: {
      accountEmail: session.user?.email!,
    },
  });

  return (
    <div className="container flex-wrap mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <Separator className="my-4"></Separator>
      </div>

      <div>
        {session.user ? <ProjectActions email={session.user.email!} /> : <></>}
      </div>

      <div className="mt-2 grid auto-rows-min gap-3 grid-cols-3">
        {projects.map((project) => (
          <div key={project.id}>
            <Link href={`/projects/${project.id}`}>
              <ProjectCard project={project}></ProjectCard>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
