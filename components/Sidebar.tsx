"use client";

import { Menu, X, MessageSquareDashed } from "lucide-react";
import { useStore } from "@/app/store";
import PastConversation from "@/components/PastConversation";
import { useEffect } from "react";

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

  useEffect(() => {
    const pastConversations = JSON.parse(
      localStorage.getItem("pastConversations") || "[]",
    );
    setPastConversations(pastConversations);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute left-0 top-0">
      <button
        className="absolute left-4 top-4 text-white transition-all"
        onClick={() => setNavState("OPEN")}
      >
        <Menu size={30} />
      </button>

      <div
        className={`${
          navState === "OPEN"
            ? "translate-x-0 shadow-custom shadow-black/80"
            : "-translate-x-full"
        } relative z-20 flex h-screen w-72 flex-col border-r border-white bg-black transition`}
      >
        <button
          className="absolute left-4 top-4 z-30 text-white transition-all"
          onClick={() => setNavState("CLOSED")}
        >
          <X size={30} />
        </button>

        <div className="mx-auto mt-14 flex w-11/12 flex-grow select-none flex-col overflow-y-scroll">
          <button
            className="text-md flex h-12 w-3/4 items-center justify-between rounded-md border border-black bg-black p-2 text-white transition hover:border-white"
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
        </div>

        <button className="m-4 h-16 rounded-md border border-white text-white transition hover:bg-white hover:text-black">
          Upgrade
        </button>
      </div>
    </div>
  );
}
