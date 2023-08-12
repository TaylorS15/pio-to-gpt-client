"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import JSZip from "jszip";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { set } from "zod";

export default function Admin() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata.subscription === "admin";
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  return (
    <div className="p-6">
      <Link
        href="/"
        className="mb-8 flex h-8 w-24 gap-4 hover:border-b-2 hover:border-white"
      >
        <CornerUpLeft size={20} className="mt-2" />
        <h1 className="text-2xl">Back</h1>
      </Link>

      {isAdmin && (
        <div className="flex w-36 flex-col gap-4">
          <button
            className="hover:underline"
            onClick={() => {
              axios({
                method: "post",
                url: `${process.env.NEXT_PUBLIC_API_URL}/logs/request`,
                data: {
                  userId: user?.id,
                },
              })
                .then((res) => {
                  const zip = new JSZip();
                  res.data.forEach((log: { name: string; data: string }) => {
                    zip.file(log.name, log.data);
                  });

                  zip.generateAsync({ type: "blob" }).then((blob) => {
                    const href = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = href;
                    link.download = "logs.zip";
                    link.click();
                    URL.revokeObjectURL(href);
                  });
                })
                .catch();
            }}
          >
            request logs
          </button>
          <button
            className="hover:underline"
            onClick={() => {
              if (deleteConfirmation === false) {
                setDeleteConfirmation(true);
              } else {
                axios({
                  method: "post",
                  url: `${process.env.NEXT_PUBLIC_API_URL}/logs/delete`,
                  data: {
                    userId: user?.id,
                  },
                })
                  .then((res) => {
                    res.status === 200 && alert("logs deleted");
                    setDeleteConfirmation(false);
                  })
                  .catch();
              }
            }}
          >
            {deleteConfirmation ? "confirm deletion" : "delete logs"}
          </button>
        </div>
      )}
    </div>
  );
}
