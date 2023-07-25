import { MessageSquare } from 'lucide-react';

export default function PastConversation() {
	return (
		<button className="w-full flex gap-4 items-center h-12 p-2 bg-black rounded-md text-md text-white hover:bg-white/10 transition">
			<MessageSquare size={20} />
			<p>Test</p>
		</button>
	);
}
