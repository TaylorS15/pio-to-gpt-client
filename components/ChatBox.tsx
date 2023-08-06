"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Conversation, useStore } from "@/app/store";
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
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Textarea } from "./ui/textarea";
import { useWindowResize } from "@/app/hooks";
import { useUser } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useState } from "react";

const formSchema = z.object({
  question: z
    .string({
      required_error: "Please enter a question.",
    })
    .min(5, "Please enter at least 5 characters.")
    .max(150, "Please enter at most 150 characters."),
  formation: z.string().optional(),
  dynamic: z.string().optional(),
});

export default function ChatBox() {
  const {
    addQuestion,
    updateResponse,
    updateConversation,
    currentConversation,
  } = useStore();
  const { elementWidth, leftMargin } = useWindowResize();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      formation: undefined,
      dynamic: undefined,
    },
  });
  const userId = useUser().user?.id;
  const { toast } = useToast();
  const [awaitingResponse, setAwaitingResponse] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const date = Date.now();
    const sixHoursAgo = date - 21600000;

    let updatedPastConversations = useStore.getState().pastConversations;
    const updatedCurrentConversation = useStore.getState().currentConversation;

    if (updatedPastConversations === null && updatedCurrentConversation) {
      updatedPastConversations = [updatedCurrentConversation];
    }

    const questionTimes = updatedPastConversations
      ? updatedPastConversations.flatMap((conversation) => {
          return conversation.conversation.map((question) => {
            return question.created;
          });
        })
      : [];
    const questionsInLastSixHours = questionTimes.filter((time) => {
      return time > sixHoursAgo;
    });

    if (questionsInLastSixHours.length < 25) {
      setAwaitingResponse(true);
      addQuestion({
        question: values.question,
        formation: values.formation || "",
        dynamic: values.dynamic || "",
        response: null,
        created: date,
      });

      const updatedConversation = useStore.getState().currentConversation;

      axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/question`,
        data: {
          form: form.getValues(),
          conversation: updatedConversation,
          userId: userId,
        },
      })
        .then((res) => {
          updateResponse(res.data.message);
          currentConversation && updateConversation(currentConversation);
          setAwaitingResponse(false);
        })
        .catch(() => {
          updateResponse("There was an error. Please try again. (Client Side)");
          currentConversation && updateConversation(currentConversation);
          setAwaitingResponse(false);
        });

      // form.reset();
    } else {
      const timeSinceLastQuestion =
        date - questionTimes[questionTimes.length - 1];
      const hoursLeft = Math.floor(
        (21600000 - timeSinceLastQuestion) / 3600000,
      );
      const minutesLeft = Math.floor(
        ((21600000 - timeSinceLastQuestion) % 3600000) / 60000,
      );

      toast({
        title: "Uh oh! You've reached your question limit.",
        description: `You can ask another question in ${hoursLeft} hours and ${minutesLeft} minutes.`,
        variant: "destructive",
      });
    }
  }

  return (
    <div
      className="mx-auto mt-auto flex max-w-5xl flex-col gap-4 lg:mx-0"
      style={{ width: elementWidth, marginLeft: leftMargin }}
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="h-[.15rem] w-full rounded-md bg-gray-300 transition"></div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-3xl "
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
                      autoComplete="off"
                      className="text-md w-full resize-none bg-black"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-auto h-12 w-24 select-none rounded-md bg-white text-black transition hover:bg-gray-200"
              disabled={awaitingResponse}
            >
              Send
            </Button>
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
                        <SelectContent>
                          <SelectItem value="BUvBB">BU vs BB</SelectItem>
                          <SelectItem value="COvBB">CO vs BB</SelectItem>
                          <SelectItem value="MPvBB">MP vs BB</SelectItem>
                          <SelectItem value="UTGvBB">UTG vs BB</SelectItem>
                          <SelectItem value="SBvBB">SB vs BB</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="bg-white text-black transition hover:bg-gray-200"
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
              </Button>
            </div>
            <p className="mt-2 text-sm">Optional Parameters</p>
          </div>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}
