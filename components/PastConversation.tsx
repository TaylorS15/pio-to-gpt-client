import { useStore } from "@/app/store";
import { Conversation } from "@/app/types";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Check, MessageSquare, Trash2, X } from "lucide-react";
import { useState } from "react";

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
    setPastConversations,
    updateConversation,
    pastConversations,
  } = useStore();
  const { user } = useUser();
  const isActive = currentConversation?.created === conversation.created;
  const [isDeleting, setIsDeleting] = useState(false);
  const [canDelete, setCanDelete] = useState(true);

  function deleteConversation() {
    setIsDeleting(false);
    setCanDelete(false);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/conversation/delete`,
      headers: {
        userid: user?.id,
      },
      data: {
        userId: user?.id,
        created: conversation.created,
      },
    })
      .then(() => {
        setCanDelete(true);
        setPastConversations(
          pastConversations
            ? pastConversations?.filter(
                (conversation) =>
                  currentConversation &&
                  conversation.created !== currentConversation.created,
              )
            : [],
        );
      })
      .catch(() => {
        setCanDelete(true);
      });
    setConversation(null);
  }

  function handleConversationClick() {
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
  }

  return (
    <button
      className="flex h-12 w-full items-center gap-4 rounded-md bg-black p-2 transition hover:bg-white/10"
      onClick={() => handleConversationClick()}
    >
      <MessageSquare size={20} />
      <p className="max-w-[55%] overflow-hidden text-ellipsis whitespace-nowrap">
        {conversation.data[0].question}
      </p>
      {isActive && isDeleting && (
        <div className="ml-auto flex gap-1">
          <Check
            size={25}
            onClick={() => deleteConversation()}
            className="rounded-full p-0.5 transition hover:bg-white/20"
          />
          <X
            size={25}
            onClick={() => setIsDeleting(false)}
            className="rounded-full p-0.5 transition hover:bg-white/20"
          />
        </div>
      )}
      {isActive && !isDeleting && canDelete && (
        <Trash2
          size={25}
          onClick={() => setIsDeleting(true)}
          className="ml-auto rounded-full p-1 transition hover:bg-white/20"
        />
      )}
    </button>
  );
}
