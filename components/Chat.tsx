"use client";

import { useStore } from "@/app/store";
import ChatBubble from "./ChatBubble";
import { useEffect, useRef, useState } from "react";
import { useWindowResize } from "@/app/hooks";

export default function Chat() {
  const { currentConversation, chatBoxHeight, headerHeight, textareaHeight } =
    useStore();
  const { elementWidth, leftMargin } = useWindowResize();
  const [chatHeight, setChatHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [currentConversation]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowHeight(window.innerHeight);
      });
    };
  }, []);

  useEffect(() => {
    setChatHeight(
      windowHeight - chatBoxHeight - 48 - headerHeight - textareaHeight - 75,
    );
  }, [windowHeight, chatBoxHeight, headerHeight, textareaHeight]);

  return (
    <div
      style={{ width: elementWidth, marginLeft: leftMargin }}
      className="flex-grow"
    >
      <div
        className="relative mx-auto flex w-full flex-col gap-4 scroll-smooth"
        style={{ height: chatHeight }}
      >
        <div className="absolute top-0 z-10 h-10 w-full bg-gradient-to-b from-black to-black/0" />
        <div
          className="mx-auto w-full max-w-7xl overflow-x-hidden overflow-y-scroll p-4"
          ref={chatRef}
        >
          <div className="h-12 w-full" />
          {currentConversation?.data.map((qAndR, index) => {
            return (
              <div className="mb-4 flex w-full flex-col gap-4" key={index}>
                <ChatBubble
                  type="user"
                  text={qAndR.question}
                  formation={qAndR.formation}
                  dynamic={qAndR.dynamic}
                  index={index}
                />
                {qAndR.response && (
                  <ChatBubble type="bot" text={qAndR.response} index={index} />
                )}
              </div>
            );
          })}
          <div className="h-12 w-full" />
        </div>
        <div className="absolute bottom-0 z-10 h-10 w-full bg-gradient-to-t from-black to-black/0" />
      </div>
    </div>
  );
}
