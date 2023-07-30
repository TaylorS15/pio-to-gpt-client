import { Conversation, useStore } from "@/app/store";
import { MessageSquare } from "lucide-react";
import { set } from "zod";

export default function PastConversation({
  conversation,
}: {
  conversation: Conversation;
}) {
  const {
    setConversation,
    setNavState,
    currentConversation,
    addConversation,
    updateConversation,
    pastConversations,
  } = useStore();

  return (
    <button
      className="text-md flex h-12 w-full items-center gap-4 rounded-md bg-black p-2 text-white transition hover:bg-white/10"
      onClick={() => {
        setNavState("CLOSED");

        if (!currentConversation) {
          setConversation(conversation);
        }

        if (currentConversation) {
          const isInPastConversations = pastConversations
            ? pastConversations.findIndex(
                (conversation) =>
                  conversation.created === currentConversation.created,
              )
            : -1;

          if (isInPastConversations === -1) {
            addConversation(currentConversation);
            setConversation(conversation);
          } else {
            if (currentConversation.created === conversation.created) {
              return;
            } else {
              updateConversation(currentConversation);
              setConversation(conversation);
            }
          }
        }
      }}
    >
      <MessageSquare size={20} />
      <p className="max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap">
        {conversation.conversation[0].question}
      </p>
    </button>
  );
}
