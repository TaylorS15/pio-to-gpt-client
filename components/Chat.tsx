'use client';

import { create } from 'zustand';
import ChatBubble from './ChatBubble';
import { useEffect } from 'react';

interface AppState {
	navState: 'OPEN' | 'CLOSED';
	conversation: [string, string][];
	addQuestionResponse: (by: [string, string]) => void;
	setNavState: (navState: 'OPEN' | 'CLOSED') => void;
}

export const useAppStore = create<AppState>()((set) => ({
	navState: 'CLOSED',
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
	setNavState: (navState) => set(() => ({ navState })),
}));

export default function Chat() {
	const { conversation } = useAppStore();

	useEffect(() => {
		const chat = document.querySelector('.chat');
		if (chat) chat.scrollTop = chat.scrollHeight;
	}, [conversation]);

	return (
		<>
			{conversation.length > 0 && (
				<div className="chat text-white w-full h-[50vh] md:h-auto max-w-5xl scroll-smooth flex flex-col gap-4 p-4 max-h-[42rem] overflow-y-scroll rounded-md border border-white">
					{conversation.map((questionAndResponse, index) =>
						questionAndResponse.map((text, nestedIndex) => (
							<ChatBubble
								key={nestedIndex}
								type={nestedIndex === 0 ? 'user' : 'bot'}
								text={text}
								index={index}
							/>
						))
					)}
				</div>
			)}
		</>
	);
}
