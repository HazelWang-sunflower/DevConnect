"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import ModeToggle from "../mode-toggle";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-background border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold">
          DevConnct
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/projects" className="text-sm font-medium">
            <Button variant="ghost">Projects</Button>
          </Link>
          <Link href="/blog" className="text-sm font-medium">
            <Button variant="ghost">Blog</Button>
          </Link>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={session.user?.image ?? ""} />
                  <AvatarFallback>{session.user?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => signOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="text-sm font-medium">
              <Button>Login</Button>
            </Link>
          )}

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
