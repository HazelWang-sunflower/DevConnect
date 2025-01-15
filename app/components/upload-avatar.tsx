"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function UploadAvatar() {
  const upload = () => {
    console.log("upload");
  };

  return (
    <div className="">
      <Avatar className="size-20 cursor-pointer" onClick={upload}>
        <AvatarImage
          src={session.user?.image ?? "https://github.com/shadcn.png"}
        />
        <AvatarFallback>{session.user?.name}</AvatarFallback>
      </Avatar>
    </div>
  );
}
