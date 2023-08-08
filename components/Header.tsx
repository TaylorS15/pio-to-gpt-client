"use client";

import { useWindowResize } from "@/app/hooks";
import { useStore } from "@/app/store";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Header() {
  const { elementWidth, leftMargin } = useWindowResize();
  const { setHeaderHeight } = useStore();
  const { userId } = useAuth();
  const isSignedIn = useState(() => {
    return userId ? true : false;
  });

  useEffect(() => {
    const header = document.querySelector(".header");
    setHeaderHeight(header?.clientHeight || 0);
  }, []);

  return (
    <div
      style={{
        width: `${isSignedIn[0] ? elementWidth : "auto"}`,
        marginLeft: `${isSignedIn[0] ? leftMargin : "none"}`,
      }}
      className="header"
    >
      <h1
        className={`${
          isSignedIn[0] ? "text-5xl" : "text-7xl"
        } w-full text-center font-semibold`}
      >
        <span className="text-pio-red">G</span>
        <span className="text-pio-green">T</span>
        <span className="text-pio-blue">O</span>
        <span className="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
          <span
            className={`${isSignedIn[0] ? "text-4xl" : "text-5xl"}
        `}
          >
            to
          </span>
          GPT
        </span>
      </h1>
    </div>
  );
}
