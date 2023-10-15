"use client";

import { Menu, X, MessageSquareDashed, Loader2 } from "lucide-react";
import { useStore } from "@/app/store";
import type { UserPublicMetadata } from "@/app/types";
import PastConversation from "@/components/PastConversation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";

export default function Sidebar() {
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
  const { user } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);
  const userPublicMetadata = user?.publicMetadata as UserPublicMetadata;
  const subscription = userPublicMetadata?.subscription
    ? userPublicMetadata?.subscription
    : "free";

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/conversation/request`, {
          headers: {
            userid: user.id,
          },
        })
        .then((data) => {
          setPastConversations(data.data.pastConversations || null);
          setIsLoaded(true);
        })
        .catch((error) => {
          setIsLoaded(true);
        });
    }
  }, [user]);

  function handleSelectNewChat() {
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
  }

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
        } relative z-20 flex h-[100dvh] w-72 flex-col border-r border-white bg-black transition lg:translate-x-0 lg:shadow-none`}
      >
        <button
          className="absolute left-4 top-4 z-30 transition-all lg:hidden"
          onClick={() => setNavState("CLOSED")}
        >
          <X size={30} />
        </button>

        <div className="mx-auto mt-14 flex w-11/12 flex-grow select-none flex-col overflow-y-scroll lg:mt-4">
          <button
            className="text-md mb-2 flex h-12 w-3/4 items-center justify-between rounded-md border border-black bg-black p-2  transition hover:border-white"
            onClick={handleSelectNewChat}
          >
            <p>New Chat</p>
            <MessageSquareDashed size={20} />
          </button>
          <div className="overflow-y-scroll">
            {pastConversations
              ?.slice()
              .sort((a, b) => b.lastUpdated - a.lastUpdated)
              .map((conversation, index) => {
                return (
                  <PastConversation key={index} conversation={conversation} />
                );
              })}
            {!isLoaded && (
              <Loader2 className="mx-auto mt-4 animate-spin" size={25} />
            )}
          </div>
        </div>

        {subscription === "free" && (
          <Link
            className="p-4"
            href={`https://buy.stripe.com/aEU9CG0bdefh0jSaEH?prefilled_email=${user?.primaryEmailAddress?.emailAddress}&client_reference_id=${user?.id}`}
          >
            <button className="h-16 w-full rounded-md border border-white bg-black text-lg transition hover:bg-white hover:text-black">
              Upgrade and get a free week!
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
