"use client";

import Sidebar from "./Sidebar";
import Profile from "./Profile";
import { HomeIcon, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathName = usePathname();
  return (
    <nav>
      {pathName === "/chat" && <Sidebar />}
      <Link href="/" className="absolute right-36 top-4">
        <HomeIcon className="h-6 w-6 hover:underline" />
      </Link>
      <Link href="/chat" className="absolute right-20 top-4">
        <MessageSquare className="h-6 w-6 hover:underline" />
      </Link>
      <Profile />
    </nav>
  );
}
