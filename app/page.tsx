import ChatBox from "@/components/ChatBox";
import Chat from "@/components/Chat";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
import Balancer from "react-wrap-balancer";
import QuestionAnimation from "@/components/QuestionAnimation";
import Header from "@/components/Header";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-black p-6 md:justify-start md:pt-32">
      <Navigation />

      <SignedIn>
        <Header />
        <Chat />
        <ChatBox />
      </SignedIn>

      <SignedOut>
        <div className="flex w-full flex-col gap-24 p-6 text-center lg:max-w-6xl">
          <div className="flex flex-col gap-8">
            <Header />

            <h2 className="mx-auto max-w-xl bg-gradient-to-br from-white to-slate-400 bg-clip-text text-2xl font-semibold text-transparent md:text-3xl">
              <Balancer>
                Supercharge your poker game by bringing solver solutions and
                GPT-4 together.
              </Balancer>
            </h2>
          </div>

          <div className="min-h-[24rem] w-full md:w-3/4">
            <QuestionAnimation />
          </div>
        </div>
      </SignedOut>
    </main>
  );
}
