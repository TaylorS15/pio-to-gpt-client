"use client";

import { useStore } from "@/app/store";
import ChatBubble from "./ChatBubble";
import { useEffect } from "react";
import { useWindowResize } from "@/app/hooks";

export default function Chat() {
  const { currentConversation } = useStore();

  const { elementWidth, leftMargin } = useWindowResize();

  useEffect(() => {
    const chat = document.querySelector(".chat");
    if (chat) chat.scrollTop = chat.scrollHeight;
  }, [currentConversation]);

  return (
    <div style={{ width: elementWidth, marginLeft: leftMargin }}>
      <div className="chat mx-auto flex h-[50vh] max-h-[42rem] w-full max-w-3xl flex-col gap-4 overflow-y-scroll scroll-smooth rounded-md border border-white p-4">
        {currentConversation?.conversation.map((qAndR, index) => {
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
    </div>
  );
}
