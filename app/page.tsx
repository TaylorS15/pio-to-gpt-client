import ChatBox from '@/components/ChatBox';
import Chat from '@/components/Chat';
import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import Profile from '@/components/Profile';
import Navigation from '@/components/Navigation';
import Balancer from 'react-wrap-balancer';
import QuestionAnimation from '@/components/QuestionAnimation';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col relative items-center justify-center gap-8 p-6 bg-black">
			<SignedIn>
				<Navigation />
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
				<div className="text-white text-center font-semibold px-6">
					<h2 className="bg-gradient-to-br text-2xl from-white to-slate-300 bg-clip-text text-transparent">
						<Balancer>
							Supercharge your poker game by bringing solver solutions and GPT-4
							together.
						</Balancer>
					</h2>
					<div className="my-20 border-white border p-4 rounded-md min-h-[24rem]">
						<QuestionAnimation />
					</div>
				</div>
				<SignIn />
			</SignedOut>
		</main>
	);
}
