'use client';

import { useAppStore } from '@/app/page';
import ChatBubble from './ChatBubble';

export default function Chat() {
	const { conversation } = useAppStore();

	return (
		<div className="text-white w-full flex flex-col gap-4 pr-4 max-h-[32rem] overflow-y-scroll">
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
	);
}
