"use client";

import { useStore } from "@/app/store";
import ChatBubble from "./ChatBubble";
import { useEffect } from "react";

export default function Chat() {
  const { currentConversation } = useStore();

  useEffect(() => {
    const chat = document.querySelector(".chat");
    if (chat) chat.scrollTop = chat.scrollHeight;
  }, [currentConversation]);

  return (
    <>
      {currentConversation && (
        <div className="chat flex h-[50vh] max-h-[42rem] w-full max-w-5xl flex-col gap-4 overflow-y-scroll scroll-smooth rounded-md border border-white p-4 text-white md:ml-48">
          {currentConversation.conversation.map((qAndR, index) => {
            return (
              <div className="flex w-full flex-col gap-4" key={index}>
                <ChatBubble type="user" text={qAndR.question} index={index} />
                {qAndR.response && (
                  <ChatBubble type="bot" text={qAndR.response} index={index} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
