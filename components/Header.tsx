"use client";

import { useWindowResize } from "@/app/hooks";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export default function Header() {
  const { elementWidth, leftMargin } = useWindowResize();
  const { userId } = useAuth();
  const isSignedIn = useState(() => {
    return userId ? true : false;
  });

  return (
    <div
      style={{
        width: `${isSignedIn[0] ? elementWidth : "auto"}`,
        marginLeft: `${isSignedIn[0] ? leftMargin : "none"}`,
      }}
    >
      <h1
        className={`${
          isSignedIn[0] ? "text-5xl" : "text-7xl"
        } mt-8 w-full text-center font-semibold`}
      >
        <span className="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
          Poker
        </span>
        <span className="text-pio-red">G</span>
        <span className="text-pio-green">P</span>
        <span className="text-pio-blue">T</span>
      </h1>
    </div>
  );
}
