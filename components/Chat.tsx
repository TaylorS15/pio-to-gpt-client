'use client';

import { create } from 'zustand';
import ChatBubble from './ChatBubble';
import { useEffect } from 'react';

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

export default function Chat() {
	const { conversation } = useAppStore();

	useEffect(() => {
		const chat = document.querySelector('.chat');
		if (chat) chat.scrollTop = chat.scrollHeight;
	}, [conversation]);

	return (
		<>
			{conversation.length > 0 && (
				<div className="chat text-white w-full flex flex-col gap-4 p-4 max-h-[48rem] overflow-y-scroll rounded-md border border-white shadow-lg shadow-white/20">
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
