"use client";

import { useWindowResize } from "@/app/hooks";
import { useStore } from "@/app/store";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { elementWidth, leftMargin } = useWindowResize();
  const { setHeaderHeight } = useStore();
  const pathName = usePathname();

  useEffect(() => {
    const header = document.querySelector(".header");
    setHeaderHeight(header?.clientHeight || 0);
  }, []);

  return (
    <div className="header ml-0 w-auto">
      <h1 className={`w-full text-center text-6xl font-semibold`}>
        <span className="text-pio-red">G</span>
        <span className="text-pio-green">T</span>
        <span className="text-pio-blue">O</span>
        <span className="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
          <span className="text-5xl">to</span>
          GPT
        </span>
      </h1>
    </div>
  );
}
