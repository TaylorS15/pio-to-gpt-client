import { Conversation, useStore } from '@/app/store';
import { MessageSquare } from 'lucide-react';
import { set } from 'zod';

export default function PastConversation({ conversation }: { conversation: Conversation }) {
	const {
		setConversation,
		setNavState,
		currentConversation,
		addConversation,
		updateConversation,
		pastConversations,
	} = useStore();

	return (
		<button
			className="w-full flex gap-4 items-center h-12 p-2 bg-black rounded-md text-md text-white hover:bg-white/10 transition"
			onClick={() => {
				setNavState('CLOSED');

				if (!currentConversation) {
					setConversation(conversation);
				}

				if (currentConversation) {
					const isInPastConversations = pastConversations
						? pastConversations.findIndex(
								(conversation) =>
									conversation.created === currentConversation.created
						  )
						: -1;

					if (isInPastConversations === -1) {
						addConversation(currentConversation);
						setConversation(conversation);
					} else {
						updateConversation(currentConversation);
						setConversation(conversation);
					}
				}
			}}>
			<MessageSquare size={20} />
			<p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[70%]">
				{conversation.conversation[0].question}
			</p>
		</button>
	);
}
