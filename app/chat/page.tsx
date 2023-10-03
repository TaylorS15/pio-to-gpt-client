import Chat from "@/components/Chat";
import ChatBox from "@/components/ChatBox";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function ChatPage() {
  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center gap-8 bg-black p-6 text-white">
      <Navigation />

      <Header />
      <Chat />
      <ChatBox />
    </main>
  );
}
