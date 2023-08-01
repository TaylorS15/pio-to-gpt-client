import ChatBox from "@/components/ChatBox";
import Chat from "@/components/Chat";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import Balancer from "react-wrap-balancer";
import QuestionAnimation from "@/components/QuestionAnimation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-8 bg-black p-6 text-white">
      <Navigation />

      <SignedIn>
        <Header />
        <Chat />
        <ChatBox />
      </SignedIn>

      <SignedOut>
        <div className="flex w-full flex-col gap-10 text-center lg:max-w-6xl lg:gap-36">
          <div className="flex flex-col gap-8">
            <Header />

            <h2 className="mx-auto max-w-3xl bg-gradient-to-br from-white to-slate-400 bg-clip-text text-2xl font-semibold text-transparent md:text-4xl">
              <Balancer>
                Supercharge your poker game by bringing solver solutions and
                GPT-4 together.
              </Balancer>
            </h2>
          </div>

          <div className="h-auto w-full rounded-md border border-white p-4 text-xl lg:mx-auto lg:w-3/4">
            <QuestionAnimation />
          </div>

          <div>
            <h2 className="mx-auto w-full text-3xl font-medium text-white lg:w-2/3">
              <Balancer>
                Sign up now and get a free question to see what Poker
                <span className="text-pio-red">G</span>
                <span className="text-pio-green">P</span>
                <span className="text-pio-blue">T</span> can do
              </Balancer>
            </h2>
            <Button className="mt-8 h-12 w-36 bg-white p-2 text-lg text-black hover:bg-gray-200">
              Sign Up
            </Button>
            <ChevronDown className="mx-auto mt-8" size={50} />
          </div>

          <div className="mb-24">
            <h2 className="text-left text-3xl font-medium">
              <span className="text-pio-red">F</span>
              <span className="text-pio-green">A</span>
              <span className="text-pio-blue">Q</span>
            </h2>

            <Accordion type="multiple" className="text-left text-xl">
              <AccordionItem value="one">
                <AccordionTrigger className="text-left">
                  What is PokerGPT?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  PokerGPT is mean't to be used in conjunction with a solver,
                  hand histories, or a database to help you reason out why a
                  certain play is good or bad.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="two">
                <AccordionTrigger className="text-left">
                  How does PokerGPT work?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  PokerGPT expands OpenAI's GPT with a massive dataset of solver
                  data to generate responses to user questions by picking
                  relevant solver data and general poker knowledge to generate
                  accurate responses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="three">
                <AccordionTrigger className="text-left">
                  Is there a limit to the amount of questions you can ask?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  Even OpenAI's GPT-4 sets a limit to the amount of questions
                  you can ask in a certain time period and so do we. API use can
                  become quite expensive with the amount of data we are using to
                  fine tune our own model and combine with user questions to
                  give you accurate responses. At the current moment there is a
                  limit of{" "}
                  <span className="italic">25 questions per 6 hours</span> to
                  prevent abuse and we are looking to expand this over time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="four">
                <AccordionTrigger className="text-left">
                  What data is collected?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  Both user questions and PokerGPT responses are collected
                  anonymously to further fine-tune our model and improve the
                  quality of PokerGPT. No user data is ever sold to or shared
                  with third parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="five">
                <AccordionTrigger className="text-left">
                  Should I give feedback to responses?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  Yes! Giving positive or negative feedback to responses will
                  significantly improve the quality of PokerGPT responses over
                  time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="six">
                <AccordionTrigger className="text-left">
                  How do I ask a good question?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  You should give as much relevant information about the spot or
                  hand as possible. You can input entire hand histories or ask
                  about general poker theory as well. It is preferable to use
                  the Dynamic and Formation selection boxes below the chat box
                  to give more information regarding your question.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="seven">
                <AccordionTrigger className="text-left">
                  How come questions can take a long time to answer?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  This depends on both OpenAI's current GPT speeds which can
                  fluctuate based on demand and the amount of data being
                  requested to answer your question. We are always working on
                  improving both the speed and accuracy of responses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="eight">
                <AccordionTrigger className="text-left">
                  Where can I receive support or give feedback?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  You are free to join our discord server and chat with us or
                  other users about PokerGPT or to get help!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="nine">
                <AccordionTrigger className="text-left">
                  Can I cancel my subscription?
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white/80">
                  You can cancel your subscription at any time and you will
                  still be able to use the service until the end of your current
                  billing period?
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </SignedOut>
    </main>
  );
}
