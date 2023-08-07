"use client";

import { Menu, X, MessageSquareDashed, Loader2 } from "lucide-react";
import { useStore } from "@/app/store";
import PastConversation from "@/components/PastConversation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export interface UserPublicMetadata {
  pastConversations: {
    created: string;
    conversation: {
      question: string;
      formation: string;
      dynamic: string;
      response: string | null;
      created: number;
    }[];
    lastUpdated: number;
  }[];
  subscription: "free" | "pro" | "admin";
  lastQuestions: number[];
}

export default function Navigation() {
  const {
    navState,
    setNavState,
    addConversation,
    pastConversations,
    currentConversation,
    setPastConversations,
    setConversation,
    updateConversation,
  } = useStore();
  const { user, isLoaded } = useUser();
  const userPublicMetadata =
    user?.publicMetadata as unknown as UserPublicMetadata;
  const subscription = userPublicMetadata?.subscription;

  useEffect(() => {
    if (user) {
      const clerkPastConversations = user.publicMetadata.pastConversations;
      if (clerkPastConversations) {
        setPastConversations(
          clerkPastConversations as UserPublicMetadata["pastConversations"],
        );
      } else {
        setPastConversations(null);
      }
    } else {
      setPastConversations(null);
    }
  }, [user]);

  return (
    <div className="absolute left-0 top-0 w-0">
      <button
        className="absolute left-4 top-4  transition-all"
        onClick={() => setNavState("OPEN")}
      >
        <Menu size={30} />
      </button>

      <div
        className={`${
          navState === "OPEN"
            ? "translate-x-0 shadow-custom shadow-black/80"
            : "-translate-x-full"
        } relative z-20 flex h-screen w-72 flex-col border-r border-white bg-black transition lg:translate-x-0 lg:shadow-none`}
      >
        <button
          className="absolute left-4 top-4 z-30 transition-all lg:hidden"
          onClick={() => setNavState("CLOSED")}
        >
          <X size={30} />
        </button>

        <div className="mx-auto mt-14 flex w-11/12 flex-grow select-none flex-col overflow-y-scroll lg:mt-4">
          <button
            className="text-md flex h-12 w-3/4 items-center justify-between rounded-md border border-black bg-black p-2  transition hover:border-white"
            onClick={() => {
              setNavState("CLOSED");

              if (currentConversation) {
                const isInPastConversations = pastConversations
                  ? pastConversations.findIndex(
                      (conversation) =>
                        conversation.created === currentConversation.created,
                    )
                  : -1;

                if (isInPastConversations !== -1) {
                  updateConversation(currentConversation);
                } else {
                  addConversation(currentConversation);
                }
              }

              setConversation(null);
            }}
          >
            <p>New Chat</p>
            <MessageSquareDashed size={20} />
          </button>
          {pastConversations
            ?.slice()
            .reverse()
            .map((conversation, index) => {
              return (
                <PastConversation key={index} conversation={conversation} />
              );
            })}
          {!isLoaded && (
            <Loader2 className="mx-auto mt-4 animate-spin" size={25} />
          )}
        </div>

        {subscription !== "pro" && subscription !== "admin" && (
          <Link
            className="p-4"
            href={`https://buy.stripe.com/test_dR6g295nWgGfe9G144?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`}
          >
            <Button className="h-16 w-full rounded-md border border-white bg-black text-lg transition hover:bg-white hover:text-black">
              Upgrade
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
