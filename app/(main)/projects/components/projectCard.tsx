import { MoreHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../../../components/ui/card";
import { Icons } from "../../../components/ui/icons";
import { Button } from "../../../components/ui/button";
import { Project } from "@/types/projects/project";
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="continer">
      <Card className="">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="text-xl">{project.name}</div> <MoreHorizontal />
          </CardTitle>
          <div>
            <div className="text-md text-gray-500 ">
              <i>{project.desc}</i>
            </div>
            <Button
              className="bg-zinc-200 dark:bg-zinc-900"
              variant="secondary"
            >
              <Icons.gitHub className="w-5 h-5"></Icons.gitHub>
              {project.url}
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
