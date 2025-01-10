"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UploadAvatar() {
  const { data: session } = useSession();

  if (!session || !session.user) {
    redirect("/login");
  }
  const uploadAvatar = () => {
    console.log("upload");
  };

  return (
    <div className="">
      <Avatar className="size-20 cursor-pointer" onClick={uploadAvatar}>
        <AvatarImage
          src={session.user?.image ?? "https://github.com/shadcn.png"}
        />
        <AvatarFallback>{session.user?.name}</AvatarFallback>
      </Avatar>
    </div>
  );
}
