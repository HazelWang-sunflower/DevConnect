import { authOptions } from "@/api/auth/[...nextauth]/route";
import ProjectActions from "@/components/projects/projectActions";
import ProjectCard from "@/components/projects/projectCard";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Projects() {
  const session = await getServerSession(authOptions);
  let projects = [];
  console.log("sss", session);

  if (!session) {
    redirect("/auth/signin");
  }

  //   if (session.user) {
  const data = await fetch(
    `http://localhost:3000/api/project?email=${session.user.email}`
  );
  projects = await data.json();
  //   }

  //   let projects = [
  //     {
  //       id: 1,
  //       name: "test",
  //       desc: "test",
  //       url: "https://github.com/settings/applications/2824121",
  //     },
  //     {
  //       id: 2,
  //       name: "test",
  //       desc: "test",
  //       url: "https://github.com/settings/applications/2824121",
  //     },
  //     {
  //       id: 3,
  //       name: "test",
  //       desc: "test",
  //       url: "https://github.com/settings/applications/2824121",
  //     },
  //     {
  //       id: 4,
  //       name: "test",
  //       desc: "test",
  //       url: "https://github.com/settings/applications/2824121",
  //     },
  //     {
  //       id: 5,
  //       name: "test",
  //       desc: "test",
  //       url: "",
  //     },
  //     {
  //       id: 6,
  //       name: "test",
  //       desc: "test",
  //       url: "https://github.com/settings/applications/2824121",
  //     },
  //     {
  //       id: 7,
  //       name: "test",
  //       desc: "test",
  //       url: "https://github.com/settings/applications/2824121",
  //     },
  //     {
  //       id: 8,
  //       name: "test",
  //       desc: "test",
  //       url: "https://github.com/settings/applications/2824121",
  //     },
  //   ];

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
            <Link href={`/projects/${project.id}`} className="block">
              <ProjectCard project={project}></ProjectCard>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
