"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Profile() {
  return (
    <div className="absolute right-4 top-4">
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User color="white" size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 border border-white bg-black text-white">
            <DropdownMenuItem className="font-semibold">
              Account Info
            </DropdownMenuItem>
            <SignOutButton>
              <DropdownMenuItem className="cursor-pointer font-semibold">
                Sign Out
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>

      <SignedOut>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User color="white" size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 border border-white bg-black text-white">
            <SignInButton>
              <DropdownMenuItem className="cursor-pointer font-semibold">
                Sign In
              </DropdownMenuItem>
            </SignInButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedOut>
    </div>
  );
}
