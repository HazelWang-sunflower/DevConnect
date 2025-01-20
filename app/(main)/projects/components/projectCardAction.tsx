import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import DeleteDialog from "./delete-dialog";
import EditDialog from "./edit-dialog";
export default function ProjectCardAction({ id }: { id: number }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <EditDialog id={id} />
          <DropdownMenuSeparator />
          <DeleteDialog id={id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
