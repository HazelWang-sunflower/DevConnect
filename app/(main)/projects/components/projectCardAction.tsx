import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideEdit, MoreHorizontal } from "lucide-react";
import DeleteDialog from "./delete-dialog";
export default function ProjectCardAction({ id }: { id: number }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <LucideEdit />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DeleteDialog id={id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
