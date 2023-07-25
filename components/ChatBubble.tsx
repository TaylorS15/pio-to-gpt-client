export default function ChatBubble({
	type,
	text,
	index,
}: {
	type: 'user' | 'bot';
	text: string;
	index: number;
}) {
	return (
		<div
			className={`${
				type === 'user'
					? 'bg-black border border-white ml-auto'
					: (index % 3 === 0
							? 'bg-pio-red'
							: index % 3 === 1
							? 'bg-pio-green'
							: 'bg-pio-blue') + ' mr-auto'
			} h-auto min-w-sm max-w-md w-auto p-4 rounded-md font-medium`}>
			{text}
		</div>
	);
}
