"use client";

import { useEffect } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { usePathname } from "next/navigation";

export default function ToastWrapper() {
  const { toast } = useToast();
  const pathName = usePathname();

  useEffect(() => {
    toast({
      title: "We are currently in BETA! (50% OFF!)",
      description:
        "During beta testing, available simulation data will be limited to Button vs. Big Blind SRP's. This will be expanded soon after our beta launch. GtG will still be useful for general poker questions and other spots with limited data!",
    });
  }, []);

  return <div className="text-black">{pathName === "/" && <Toaster />}</div>;
}
