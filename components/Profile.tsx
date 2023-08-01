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
import Link from "next/link";

export default function Profile() {
  return (
    <div className="absolute right-4 top-4">
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User color="white" size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 border border-white bg-black font-semibold text-white">
            <DropdownMenuItem className="cursor-pointer">
              Account Info
            </DropdownMenuItem>
            <Link href="/faq">
              <DropdownMenuItem className="cursor-pointer">
                FAQ
              </DropdownMenuItem>
            </Link>
            <SignOutButton>
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
