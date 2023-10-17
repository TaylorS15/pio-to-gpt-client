"use client";

import { useEffect } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";

export default function ToastWrapper() {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "We are currently in BETA! (50% OFF!)",
      description:
        "During beta testing, available simulation data will be limited to certain spots and formations. This will be expanded throughout beta. GtG will still be useful for general poker questions and other spots even with limited data!",
    });
  }, []);

  return (
    <div className="text-black">
      <Toaster />
    </div>
  );
}
