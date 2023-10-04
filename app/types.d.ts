export type UserPublicMetadata = {
  pastConversations: Conversation[];
  subscription: "free" | "pro" | "admin";
  lastQuestions: number[];
  hasCancelled: boolean;
};

export type Question = {
  question: string;
  depth: string;
  formation: string;
  dynamic: string;
  response: string | null;
  created: number;
};

export type Conversation = {
  created: string;
  data: Question[];
  lastUpdated: number;
};
