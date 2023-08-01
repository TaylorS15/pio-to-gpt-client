import ChatBox from "@/components/ChatBox";
import Chat from "@/components/Chat";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import Balancer from "react-wrap-balancer";
import QuestionAnimation from "@/components/QuestionAnimation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ChevronDown, Minus } from "lucide-react";
import FAQ from "@/components/FAQ";

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
            <SignUpButton>
              <Button className="mt-8 h-12 w-36 bg-white p-2 text-lg text-black hover:bg-gray-200">
                Sign Up
              </Button>
            </SignUpButton>
            <ChevronDown className="mx-auto mt-8 text-white/20" size={50} />
          </div>

          <div className="flex flex-col gap-24 text-left">
            <div className="flex gap-4">
              <Minus size={25} className="my-auto" />
              <h2 className="w-4/5 text-3xl font-medium md:text-4xl">
                Unlimited
                <span className="align-top text-sm">*</span> questions
              </h2>
            </div>

            <div className="flex gap-4">
              <Minus size={25} className="my-auto" />
              <h2 className="w-4/5 text-3xl font-medium md:text-4xl">
                Combines massive datasets of solver outputs with GPT-4
              </h2>
            </div>

            <div className="flex gap-4">
              <Minus size={25} className="my-auto" />
              <h2 className="w-4/5 text-3xl font-medium md:text-4xl">
                Generates accurate reasoning behind No Limit Hold'em strategy
                and theory
              </h2>
            </div>
          </div>

          <div className="mb-24">
            <FAQ />
          </div>
        </div>
      </SignedOut>
    </main>
  );
}
