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
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="absolute right-4 top-4">
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User color="white" size={25} className="hover:underline" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mr-4 border border-white bg-black font-semibold text-white">
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                {user?.primaryEmailAddress?.emailAddress}
              </DropdownMenuItem>
            </Link>

            <Link href="/faq">
              <DropdownMenuItem className="cursor-pointer">
                FAQ
              </DropdownMenuItem>
            </Link>

            <SignOutButton signOutCallback={() => router.push("/")}>
              <DropdownMenuItem className="cursor-pointer">
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

          <DropdownMenuContent className="mr-4 border border-white bg-black font-semibold text-white">
            <SignInButton>
              <DropdownMenuItem className="cursor-pointer">
                Sign In
              </DropdownMenuItem>
            </SignInButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedOut>
    </div>
  );
}
