import ChatBox from "@/components/ChatBox";
import Chat from "@/components/Chat";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import Balancer from "react-wrap-balancer";
import QuestionAnimation from "@/components/QuestionAnimation";
import Header from "@/components/Header";
import { ChevronDown, CornerUpRight, Minus } from "lucide-react";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center gap-8 bg-black p-6 text-white">
      <Navigation />

      <SignedIn>
        <Header />
        <Chat />
        <ChatBox />
      </SignedIn>

      <SignedOut>
        <div className="flex w-full flex-col gap-10 text-center lg:max-w-6xl lg:gap-32">
          <div className="mt-12 flex flex-col gap-16 md:gap-8">
            <Header />

            <h2 className="mx-auto max-w-3xl bg-gradient-to-br from-white to-slate-400 bg-clip-text text-2xl font-semibold text-transparent md:text-4xl">
              <Balancer>
                Supercharge your poker game by bringing solver solutions and
                GPT-4 together.
              </Balancer>
            </h2>
          </div>

          <div className="my-auto h-[32rem] w-full rounded-md text-xl lg:mx-auto lg:w-3/4">
            <QuestionAnimation />
          </div>

          <div>
            <h2 className="mx-auto w-full text-4xl font-medium text-white lg:w-2/3">
              <Balancer>
                Sign up now and get a free week to see what{" "}
                <span className="text-pio-red">G</span>
                <span className="text-pio-green">T</span>
                <span className="text-pio-blue">O</span>
                <span className="text-2xl">to</span>GPT can do
              </Balancer>
            </h2>
            <SignUpButton>
              <button className="mt-8 h-12 w-36 rounded-md bg-white p-2 text-lg text-black transition hover:bg-gray-200">
                Sign Up
              </button>
            </SignUpButton>
            <ChevronDown className="mx-auto mt-8 text-white/20" size={50} />
          </div>

          <div className="flex flex-col gap-16 text-left">
            <div className="flex gap-4">
              <Minus size={25} className="my-auto" />
              <h2 className="w-4/5 text-2xl font-medium md:text-3xl">
                Access to the only chat bot built to answer poker questions on
                the market.
              </h2>
            </div>

            <div className="flex gap-4">
              <Minus size={25} className="my-auto" />
              <h2 className="w-4/5 text-2xl font-medium md:text-3xl">
                Combines massive datasets of solver solutions and general poker
                knowledge with GPT-4.
              </h2>
            </div>

            <div className="flex gap-4">
              <Minus size={25} className="my-auto" />
              <h2 className="w-4/5 text-2xl font-medium md:text-3xl">
                More accurate reasoning and higher quality responses to poker
                strategy and theory questions than base GPT-4.
              </h2>
            </div>

            <div className="flex gap-4">
              <Minus size={25} className="my-auto" />
              <h2 className="w-4/5 text-2xl font-medium md:text-3xl">
                Available on Desktop and Mobile browsers.
              </h2>
            </div>

            <h2 className="w-4/5 text-4xl font-semibold md:text-5xl">
              For only <span className="text-pio-green">$10</span> a month.
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-4xl font-medium">
              <Balancer>
                Speed up your learning by not just asking what a solver would
                do,{" "}
                <span className="text-pio-green">
                  but answering why the solver does it.
                </span>{" "}
                Want to know if you should take one action over another based on
                your opponents tendancies? Stop paying hundreds for hand reviews
                and get an answer in seconds for{" "}
                <span className="text-pio-green">a fraction of the price.</span>
              </Balancer>
            </p>

            <SignUpButton>
              <button className="mx-auto mt-10 flex h-20 w-full max-w-sm items-center justify-center gap-8 rounded-md border border-white bg-black text-2xl font-medium transition hover:bg-pio-green/80">
                <h2>Sign Up Now</h2>
                <CornerUpRight size={25} />
              </button>
            </SignUpButton>
          </div>

          <div className="mb-24">
            <FAQ />
          </div>

          <Footer />
        </div>
      </SignedOut>
    </main>
  );
}
