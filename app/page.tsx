import ChatBox from '@/components/ChatBox';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col relative items-center justify-center gap-28 p-6 bg-black">
			<div className="absolute top-4 right-4">
				<UserButton />
			</div>
			<h1 className="text-5xl font-semibold">
				<span className="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
					Poker
				</span>
				<span className="text-pio-red">G</span>
				<span className="text-pio-green">P</span>
				<span className="text-pio-blue">T</span>
			</h1>
			<SignedIn>
				<ChatBox />
			</SignedIn>
			<SignedOut>
				<SignInButton />
			</SignedOut>
		</main>
	);
}
