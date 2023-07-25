'use client';

import { create } from 'zustand';
import ChatBubble from './ChatBubble';
import { useEffect } from 'react';

interface AppState {
	navState: 'OPEN' | 'CLOSED';
	conversation: [[string, string, string], string][];
	addQuestion: (by: [[string, string, string], '']) => void;
	updateResponse: (response: string) => void;
	setNavState: (navState: 'OPEN' | 'CLOSED') => void;
}

export const useAppStore = create<AppState>()((set) => ({
	navState: 'CLOSED',
	conversation: [],
	addQuestion: (question) =>
		set((state) => ({ conversation: [...state.conversation, question] })),
	updateResponse: (response) =>
		set((state) => {
			let newConvo = [...state.conversation];
			let lastQuestion = newConvo[newConvo.length - 1];
			lastQuestion[1] = response;
			return { conversation: newConvo };
		}),
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
						questionAndResponse.map((qorr, nestedIndex) => (
							<ChatBubble
								key={nestedIndex}
								type={nestedIndex === 0 ? 'user' : 'bot'}
								text={qorr}
								index={index}
							/>
						))
					)}
				</div>
			)}
		</>
	);
}
