"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Icons } from "@/components/ui/icons";

export default function Profile() {
  const { data: session } = useSession();

  const [name, setName] = useState(session?.user?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!session || !session.user) {
    redirect("/login");
  }

  function uploadAvatar() {
    console.log("uploadAvatar");
  }

  async function setUsername() {
    console.log("name", name);
    setIsLoading(true);
    setError("");
    if (session?.user?.email) {
      const response = await fetch("http://localhost:3000/api/account", {
        method: "POST",
        body: JSON.stringify({ name: name, email: session.user?.email }),
      });

      const data = await response.json();
      console.log("response", data);
      if (response.ok) {
        console.log("update name success!");
        setName(data.username);
      } else {
        setError(data.error);
      }
    }

    setIsLoading(false);
  }

  return (
    <div className="container mx-auto px-8 py-4">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Separator className="my-4" />
      <div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Avatar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <p>
                This is your avatar. Click on the avatar to upload a custom one
                from your files.
              </p>
              <div className="">
                <Avatar
                  className="size-20 cursor-pointer"
                  onClick={uploadAvatar}
                >
                  <AvatarImage
                    src={session.user?.image ?? "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>{session.user?.name}</AvatarFallback>
                </Avatar>
                {/* <UploadAvatar></UploadAvatar> */}
              </div>
            </CardContent>
            <Separator className="my-4" />
            <CardFooter>
              <p>An avatar is optional but strongly recommended.</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Username</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Please enter your full name, or a display name you are
                comfortable with.
              </p>
              <Input
                className="my-4 w-1/2"
                type="text"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <p>Please use 20 characters at maximum.</p>
            </CardContent>
            <Separator className="my-4" />
            <CardFooter>
              <Button onClick={setUsername}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
