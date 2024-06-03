import { SignUpButton } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import Balancer from "react-wrap-balancer";
import QuestionAnimation from "@/components/QuestionAnimation";
import Header from "@/components/Header";
import { ChevronDown, CornerUpRight, Minus } from "lucide-react";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ToastWrapper from "@/components/ToastWrapper";

export default function Home() {
  return (
    <main className="relative flex max-h-[100dvh] min-h-[100vh] w-full flex-col items-center gap-8 bg-gradient-to-b from-zinc-800 to-black p-6 text-white">
      <Navigation />

      <div className="flex w-full flex-col gap-10 text-center lg:max-w-6xl lg:gap-32">
        <div className="mt-12 flex flex-col gap-8 md:gap-8">
          <Header />

          <h2 className="mx-auto max-w-3xl bg-gradient-to-br from-white to-slate-400 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
            <Balancer>
              Supercharge your poker learning by bringing solver solutions and
              GPT-4o together.
            </Balancer>
          </h2>
        </div>

        <div className="my-auto h-auto w-full rounded-md text-xl lg:mx-auto lg:w-3/4">
          <QuestionAnimation />
        </div>

        <div className="mt-16">
          <h2 className="mx-auto w-full text-4xl font-medium text-white lg:w-2/3">
            <Balancer>
              Sign up now and see what <span className="text-pio-red">G</span>
              <span className="text-pio-green">T</span>
              <span className="text-pio-blue">O</span>
              <span className="text-2xl">to</span>GPT can do
            </Balancer>
          </h2>
          <SignUpButton signInFallbackRedirectUrl="/chat">
            <button className="mt-8 h-12 w-36 rounded-md bg-white p-2 text-lg text-black transition hover:bg-gray-200">
              Sign Up
            </button>
          </SignUpButton>
          <h2 className="mx-auto mt-6 w-full text-lg text-white lg:w-2/3">
            Get one free question with a new account. No payment method
            required.
          </h2>
          <ChevronDown className="mx-auto mt-6 text-white/20" size={50} />
        </div>

        <div className="flex flex-col gap-16 text-left">
          <div className="flex gap-4">
            <Minus size={25} className="my-auto" />
            <h3 className="w-4/5 text-2xl font-medium md:text-3xl">
              Access to the most accurate and affordable chat bot built to
              answer poker questions on the market.
            </h3>
          </div>

          <div className="flex gap-4">
            <Minus size={25} className="my-auto" />
            <h3 className="w-4/5 text-2xl font-medium md:text-3xl">
              Combines massive datasets of solver solutions and general poker
              knowledge with GPT-4o.
            </h3>
          </div>

          <div className="flex gap-4">
            <Minus size={25} className="my-auto" />
            <h3 className="w-4/5 text-2xl font-medium md:text-3xl">
              More accurate reasoning and higher quality responses to poker
              strategy and theory questions than base GPT-4o.
            </h3>
          </div>

          <div className="flex gap-4">
            <Minus size={25} className="my-auto" />
            <h3 className="w-4/5 text-2xl font-medium md:text-3xl">
              Available on Desktop and Mobile browsers.
            </h3>
          </div>

          <h3 className="w-4/5 text-4xl font-semibold md:text-5xl">
            For only <span className="text-pio-green">$15</span> a month.
          </h3>
        </div>

        <div className="my-24 flex flex-col gap-8">
          <p className="text-4xl font-medium">
            <Balancer>
              Speed up your learning by not just asking what a solver would do{" "}
              <span className="text-pio-green">
                but answering why the solver does it.
              </span>{" "}
              Want to know if you should take one action over another based on
              opponent tendancies? Get insight on these types of questions for
              only <span className="text-pio-green">$15 a month</span>.
            </Balancer>
          </p>

          <SignUpButton signInFallbackRedirectUrl="/chat">
            <button className="mx-auto mt-10 flex h-20 w-full max-w-sm items-center justify-center gap-8 rounded-md border border-white bg-black text-2xl font-medium transition hover:bg-pio-green/80">
              <h2>Sign Up Now</h2>
              <CornerUpRight size={25} />
            </button>
          </SignUpButton>
        </div>

        <div className="mb-24">
          <FAQ />
        </div>

        {/* <ToastWrapper /> */}

        <Footer />
      </div>
    </main>
  );
}
