'use client';

import { useStore } from '@/app/store';
import ChatBubble from './ChatBubble';
import { useEffect } from 'react';

export default function Chat() {
	const { currentConversation } = useStore();

	useEffect(() => {
		const chat = document.querySelector('.chat');
		if (chat) chat.scrollTop = chat.scrollHeight;
	}, [currentConversation]);

	return (
		<>
			{currentConversation && (
				<div className="chat text-white w-full h-[50vh] md:h-auto max-w-5xl scroll-smooth flex flex-col gap-4 p-4 max-h-[42rem] overflow-y-scroll rounded-md border border-white">
					{currentConversation.conversation.map((qAndR, index) => {
						return (
							<div className="w-full flex flex-col gap-4" key={index}>
								<ChatBubble type="user" text={qAndR.question} index={index} />
								{qAndR.response && (
									<ChatBubble type="bot" text={qAndR.response} index={index} />
								)}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}
