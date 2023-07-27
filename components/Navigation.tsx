'use client';

import { Menu, X, MessageSquareDashed } from 'lucide-react';
import { useStore } from '@/app/store';
import PastConversation from '@/components/PastConversation';
import { useEffect } from 'react';

export default function Navigation() {
	const {
		navState,
		setNavState,
		addConversation,
		pastConversations,
		currentConversation,
		setPastConversations,
		setConversation,
		updateConversation,
	} = useStore();

	useEffect(() => {
		const pastConversations = JSON.parse(localStorage.getItem('pastConversations') || '[]');
		setPastConversations(pastConversations);

		console.log(pastConversations);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="absolute top-0 left-0 z-10 w-0">
				<button
					className="transition-all absolute top-4 left-4 text-white"
					onClick={() => setNavState('OPEN')}>
					<Menu size={30} />
				</button>
				<div
					className={`${
						navState === 'OPEN'
							? 'translate-x-0 shadow-custom shadow-black/80'
							: '-translate-x-full'
					} relative w-72 z-20 h-screen flex flex-col bg-black border-r border-white transition`}>
					<button
						className="transition-all absolute top-4 left-4 text-white z-30"
						onClick={() => setNavState('CLOSED')}>
						<X size={30} />
					</button>
					<div className="mt-14 mx-auto w-11/12 flex flex-col flex-grow overflow-y-scroll select-none">
						<button
							className="w-3/4 flex justify-between items-center h-12 p-2 bg-black border border-black text-white hover:border-white rounded-md text-md transition"
							onClick={() => {
								setNavState('CLOSED');

								if (currentConversation) {
									const isInPastConversations = pastConversations
										? pastConversations.findIndex(
												(conversation) =>
													conversation.created ===
													currentConversation.created
										  )
										: -1;

									if (isInPastConversations !== -1) {
										updateConversation(currentConversation);
									} else {
										addConversation(currentConversation);
									}
								}

								setConversation(null);
							}}>
							<p>New Chat</p>
							<MessageSquareDashed size={20} />
						</button>
						{pastConversations
							?.slice()
							.reverse()
							.map((conversation, index) => {
								return <PastConversation key={index} conversation={conversation} />;
							})}
					</div>
				</div>
			</div>
		</>
	);
}
