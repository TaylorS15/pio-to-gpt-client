'use client';

import { Menu, X, MessageSquareDashed } from 'lucide-react';
import { useAppStore } from '@/components/Chat';
import PastConversation from '@/components/PastConversation';

export default function Navigation() {
	const { navState, setNavState } = useAppStore();
	return (
		<>
			<div className="absolute top-0 left-0 z-10 w-0 md:hidden">
				<button
					className="transition-all absolute top-4 left-4 text-white"
					onClick={() => setNavState('OPEN')}>
					<Menu size={30} />
				</button>
				<div
					className={`${
						navState === 'OPEN' ? 'translate-x-0' : '-translate-x-full'
					} relative w-72 z-20 h-screen flex flex-col bg-black border-r border-white transition`}>
					<button
						className="transition-all absolute top-4 left-4 text-white z-30"
						onClick={() => setNavState('CLOSED')}>
						<X size={30} />
					</button>
					<div className="mt-14 mx-auto w-11/12 flex flex-col flex-grow overflow-y-scroll select-none">
						<button className="w-3/4 flex justify-between items-center h-12 p-2 bg-black border border-black text-white hover:border-white rounded-md text-md transition">
							<p>New Chat</p>
							<MessageSquareDashed size={20} />
						</button>
						<PastConversation />
						<PastConversation />
						<PastConversation />
						<PastConversation />
						<PastConversation />
						<PastConversation />
						<PastConversation />
						<PastConversation />
						<PastConversation />
					</div>
				</div>
			</div>
		</>
	);
}
