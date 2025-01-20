"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideEdit } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { fetchProject, updateProject } from "@/actions/project.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditDialog({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    id: z.number(),
    name: z.string().nonempty({ message: "Project Name is required." }),
    desc: z.string(),
    url: z.string().url({ message: "Please enter a valid URL." }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>();

  useEffect(() => {
    const loadData = async () => {
      const project = await fetchProject(id);
      if (project) {
        reset(project);
      }
    };
    loadData();
  }, [reset]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setIsLoading(true);
    setError("");
    // await updateProject(data, email);

    setIsLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <LucideEdit />
            Edit
          </DropdownMenuItem>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form
              className="w-full space-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Label>Project Name</Label>
              <Input
                placeholder="Project Name"
                {...register("name", {
                  required: "Project name is required",
                })}
                disabled={isLoading}
              />
              <Label>Description</Label>
              <Textarea
                disabled={isLoading}
                {...register("desc", {
                  required: "Project name is required",
                })}
                placeholder="Type your project description here."
              />
              <Label>GitHub URL</Label>
              <Input
                type="text"
                placeholder="GitHub URL"
                {...register("url", {
                  required: "URL is required",
                })}
                disabled={isLoading}
              />
              <Button variant="outline" onClick={() => setOpen(false)}></Button>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
