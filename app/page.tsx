import ChatBox from '@/components/ChatBox';
import Chat from '@/components/Chat';
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import Profile from '@/components/Profile';
import { create } from 'zustand';

interface AppState {
	conversation: [string, string][];
	addQuestionResponse: (by: [string, string]) => void;
}

export const useAppStore = create<AppState>()((set) => ({
	conversation: [
		[
			'test question',
			'test long response test long response test long response test long response test long response test long response',
		],
		[
			'test question',
			'test long response test long response test long response test long response test long response test long response',
		],
		[
			'test question',
			'test long response test long response test long response test long response test long response test long response',
		],
	],
	addQuestionResponse: (qr) => set((state) => ({ conversation: [...state.conversation, qr] })),
}));

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col relative items-center justify-center gap-20 p-6 bg-black">
			<SignedIn>
				<Profile />
			</SignedIn>

			<h1 className="text-5xl font-semibold">
				<span className="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
					Poker
				</span>
				<span className="text-pio-red">G</span>
				<span className="text-pio-green">P</span>
				<span className="text-pio-blue">T</span>
			</h1>

			<SignedIn>
				<Chat />
				<ChatBox />
			</SignedIn>
			<SignedOut>
				<SignIn />
			</SignedOut>
		</main>
	);
}
