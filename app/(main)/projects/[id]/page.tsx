import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProjectDetail({
  params,
}: {
  params: { id: number };
}) {
  const detail = await prisma.project.findUnique({
    where: { id: Number(params.id) },
  });
  return (
    <div className="container flex-wrap mx-auto py-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">{detail?.name}</h1>
        <Link href={detail!.url} target="_blank">
          <Button variant="outline">
            <Icons.gitHub className="w-5 h-5"></Icons.gitHub>Repository
          </Button>
        </Link>
      </div>
      <Separator className="my-4"></Separator>

      <div className="mt-2 flex">
        <div>Project Auth</div>
        <div>{detail?.accountEmail}</div>
      </div>
      <div className="mt-2 flex">
        <div>Project Description</div>
        <div>{detail?.desc}</div>
      </div>
    </div>
  );
}
