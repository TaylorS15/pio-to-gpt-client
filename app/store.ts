import { create } from "zustand";

export type Question = {
  question: string;
  formation: string;
  dynamic: string;
  response: string | null;
  created: number;
};
export type Conversation = {
  created: string;
  conversation: Question[];
  lastUpdated: number;
};

interface AppState {
  navState: "OPEN" | "CLOSED";
  currentConversation: Conversation | null;
  pastConversations: Conversation[] | null;
  setNavState: (navState: "OPEN" | "CLOSED") => void;
  setConversation: (conversation: Conversation | null) => void;
  addQuestion: (question: Question) => void;
  updateResponse: (response: string) => void;
  setPastConversations: (pastConversation: Conversation[] | null) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (conversation: Conversation) => void;
}

export const useStore = create<AppState>()((set) => ({
  navState: "CLOSED",
  currentConversation: null,
  pastConversations: null,
  setNavState: (navState) => set(() => ({ navState })),
  setConversation: (currentConversation) =>
    set(() => ({ currentConversation })),
  addQuestion: (question) =>
    set((state) => {
      if (state.currentConversation === null) {
        return {
          currentConversation: {
            created: new Date().toISOString(),
            conversation: [question],
            lastUpdated: Date.now(),
          },
        };
      } else {
        return {
          currentConversation: {
            created: state.currentConversation.created,
            conversation: [...state.currentConversation.conversation, question],
            lastUpdated: Date.now(),
          },
        };
      }
    }),
  updateResponse: (response) =>
    set((state) => {
      if (state.currentConversation === null) {
        return state;
      } else {
        const lastQuestionIndex =
          state.currentConversation.conversation.length - 1;

        const updatedConversation = state.currentConversation.conversation.map(
          (question, index) => {
            if (index === lastQuestionIndex) {
              return { ...question, response };
            }
            return question;
          },
        );

        return {
          currentConversation: {
            ...state.currentConversation,
            conversation: updatedConversation,
            lastUpdated: Date.now(),
          },
        };
      }
    }),
  setPastConversations: (pastConversations) =>
    set(() => ({ pastConversations })),
  addConversation: (conversation) =>
    set((state) => {
      if (state.pastConversations === null) {
        return { pastConversations: [conversation] };
      } else {
        return {
          pastConversations: [...state.pastConversations, conversation],
        };
      }
    }),
  updateConversation: (conversation) =>
    set((state) => {
      if (state.pastConversations === null) {
        return state;
      } else {
        const updatedPastConversations = state.pastConversations.map(
          (pastConversation) => {
            if (pastConversation.created === conversation.created) {
              return conversation;
            }
            return pastConversation;
          },
        );

        return { pastConversations: updatedPastConversations };
      }
    }),
}));
