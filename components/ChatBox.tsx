"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@/app/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { useWindowResize } from "@/app/hooks";
import { useUser } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useEffect, useRef, useState } from "react";
import { UserPublicMetadata } from "@/app/types";
import { io } from "socket.io-client";

const formSchema = z.object({
  question: z
    .string({
      required_error: "Please enter a question.",
    })
    .min(5, "Please enter at least 5 characters.")
    .max(300, "Please enter at most 300 characters."),
  depth: z.string().optional(),
  formation: z.string().optional(),
  dynamic: z.string().optional(),
});

export default function ChatBox() {
  const {
    addQuestion,
    updateResponse,
    updateConversation,
    currentConversation,
    setChatBoxHeight,
    setTextareaHeight,
    textareaHeight,
  } = useStore();
  const { elementWidth, leftMargin } = useWindowResize();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      depth: "100bb",
      formation: undefined,
      dynamic: undefined,
    },
  });
  const { user } = useUser();
  const { toast } = useToast();
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const userPublicMetadata = user?.publicMetadata as UserPublicMetadata;
  const [subscription, setSubscription] = useState<"free" | "pro" | "admin">(
    "free",
  );
  /**
   * Array of timestamps of the last 25 questions asked by the user.
   */
  const [lastQuestions, setLastQuestions] = useState<number[]>([]);
  const [progressBar, setProgressBar] = useState(0);
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      if (userPublicMetadata.subscription) {
        setSubscription(userPublicMetadata.subscription);
      }
      if (userPublicMetadata.lastQuestions) {
        setLastQuestions(userPublicMetadata.lastQuestions);
      }
    }
  }, [user, userPublicMetadata]);

  useEffect(() => {
    if (chatboxRef.current) {
      setChatBoxHeight(chatboxRef.current.clientHeight);
    }
  }, []);

  function submitQuestion(values: z.infer<typeof formSchema>) {
    const date = Date.now();

    setAwaitingResponse(true);
    addQuestion({
      question: values.question,
      depth: "100bb",
      formation: values.formation || "",
      dynamic: values.dynamic || "",
      response: null,
      created: date,
    });

    const fontSize = window.getComputedStyle(document.documentElement).fontSize;
    setTextareaHeight(parseInt(fontSize) * 4);

    const updatedConversation = useStore.getState().currentConversation;

    const socket = io(process.env.NEXT_PUBLIC_API_URL || "", {
      autoConnect: false,
      extraHeaders: {
        userId: user?.id ?? "",
      },
      reconnectionAttempts: 3,
    });

    socket.connect();

    socket.on("connect", () => {
      setProgressBar(0);
    });

    socket.emit("/question", {
      form: form.getValues(),
      conversation: updatedConversation,
      userId: user?.id,
    });

    socket.on("message", (res: { message: string }) => {
      updateResponse(res.message, true);
    });

    socket.on("progress", (res: { progress: number }) => {
      setProgressBar(res.progress);
    });

    socket.on("error", (res: { message: string }) => {
      updateResponse(res.message, false);
      currentConversation && updateConversation(currentConversation);
      setAwaitingResponse(false);
      setLastQuestions([...lastQuestions, date]);
    });

    socket.on("disconnect", () => {
      currentConversation && updateConversation(currentConversation);
      setAwaitingResponse(false);
      setLastQuestions([...lastQuestions, date]);
      setTimeout(() => {
        setProgressBar(0);
      }, 500);
    });

    socket.on("connect_error", (err) => {
      updateResponse("Server is unreachable, please try again later!", false);
      currentConversation && updateConversation(currentConversation);
      setAwaitingResponse(false);
      setLastQuestions([...lastQuestions, date]);
    });

    form.reset();
  }

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    let updatedPastConversations = useStore.getState().pastConversations;
    const updatedCurrentConversation = useStore.getState().currentConversation;

    if (updatedPastConversations === null && updatedCurrentConversation) {
      updatedPastConversations = [updatedCurrentConversation];
    }

    if (subscription === "pro") {
      const conversationLength = updatedCurrentConversation
        ? updatedCurrentConversation.data.length + 1
        : 1;

      if (lastQuestions.length < 25 && conversationLength < 6) {
        submitQuestion(values);
      } else {
        if (conversationLength >= 6) {
          toast({
            title: "Uh oh! This conversation is too long.",
            description: `Start a fresh conversation to ask your question.`,
            variant: "destructive",
          });
        } else {
          const timeSinceEarliestQuestion = Date.now() - lastQuestions[0];
          const hoursLeft = Math.floor(
            (21600000 - timeSinceEarliestQuestion) / 3600000,
          );
          const minutesLeft = Math.floor(
            ((21600000 - timeSinceEarliestQuestion) % 3600000) / 60000,
          );

          toast({
            title: "Uh oh! You've reached your question limit.",
            description: `You can ask another question in ${hoursLeft} hours and ${minutesLeft} minutes.`,
            variant: "destructive",
          });
        }
      }
    } else if (subscription === "admin") {
      submitQuestion(values);
    } else {
      if (lastQuestions.length === 0) {
        submitQuestion(values);
      } else {
        toast({
          title: "Uh oh! You've reached your question limit.",
          description: `Upgrade to Pro to ask more questions!`,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div
      className="mx-auto mt-auto flex max-w-5xl flex-col gap-4 lg:mx-0"
      style={{ width: elementWidth, marginLeft: leftMargin }}
      ref={chatboxRef}
    >
      <div className="mx-auto w-full max-w-3xl">
        <div
          style={{ width: `${progressBar}%` }}
          className="h-[.15rem] rounded-md bg-gray-300 transition-all duration-1000"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className="mx-auto w-full max-w-3xl"
        >
          <div className="flex w-full max-w-3xl gap-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormMessage />
                  <FormControl>
                    <Textarea
                      {...field}
                      style={{ height: `${textareaHeight}px` }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "3rem";
                        target.style.height = `${Math.min(
                          target.scrollHeight,
                          160,
                        )}px`;
                        setTextareaHeight(target.scrollHeight);
                      }}
                      autoComplete="off"
                      className="text-md w-full resize-none bg-black"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              type="submit"
              className={`${
                awaitingResponse
                  ? "bg-white/50 hover:bg-white/50"
                  : "bg-white hover:bg-white/90"
              } mt-auto h-12 w-24 select-none rounded-md font-medium text-black transition `}
              disabled={awaitingResponse}
            >
              Send
            </button>
          </div>
          <div className="mt-4 select-none">
            <div className="flex w-max gap-4">
              <FormField
                control={form.control}
                name="dynamic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-[125px]">
                          <SelectValue placeholder="Dynamic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SRP">SRP</SelectItem>
                          {/* <SelectItem value="3BP">3BP</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="formation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={
                          form.getValues("dynamic") === undefined ?? true
                        }
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Formation" />
                        </SelectTrigger>
                        {form.getValues("dynamic") === "SRP" && (
                          <SelectContent>
                            <SelectItem value="BUvBB">BU vs BB</SelectItem>
                            {/* <SelectItem value="COvBB">CO vs BB</SelectItem>
                            <SelectItem value="MPvBB">MP vs BB</SelectItem>
                            <SelectItem value="UTGvBB">UTG vs BB</SelectItem>
                            <SelectItem value="SBvBB">SB vs BB</SelectItem> */}
                          </SelectContent>
                        )}
                        {form.getValues("dynamic") === "3BP" && (
                          <SelectContent>
                            <SelectItem value="MPvUTG">MP vs UTG</SelectItem>
                            <SelectItem value="COvUTG">CO vs UTG</SelectItem>
                            <SelectItem value="COvMP">CO vs MP</SelectItem>
                            <SelectItem value="BUvUTG">BU vs UTG</SelectItem>
                            <SelectItem value="BUvMP">BU vs MP</SelectItem>
                            <SelectItem value="BUvCO">BU vs CO</SelectItem>
                            <SelectItem value="SBvUTG">SB vs UTG</SelectItem>
                            <SelectItem value="SBvMP">SB vs MP</SelectItem>
                            <SelectItem value="SBvCO">SB vs CO</SelectItem>
                            <SelectItem value="SBvBU">SB vs BU</SelectItem>
                            <SelectItem value="BBvUTG">BB vs UTG</SelectItem>
                            <SelectItem value="BBvMP">BB vs MP</SelectItem>
                            <SelectItem value="BBvCO">BB vs CO</SelectItem>
                            <SelectItem value="BBvBU">BB vs BU</SelectItem>
                          </SelectContent>
                        )}
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <button
                className="w-20 rounded-md bg-white font-medium text-black transition hover:bg-gray-200"
                type="reset"
                onClick={() => {
                  form.reset({
                    question: undefined,
                    formation: undefined,
                    dynamic: undefined,
                  });
                }}
              >
                Reset
              </button>
            </div>
            <p className="mt-2 text-sm">Optional Parameters</p>
          </div>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}
