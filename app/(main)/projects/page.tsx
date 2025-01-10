import ProjectActions from "@/components/projects/projectActions";
import { Separator } from "@/components/ui/separator";

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <Separator className="my-4"></Separator>
      </div>

      <div>
        <ProjectActions />
      </div>
    </div>
  );
}
