import { useEffect, useState } from 'react';

export default function ChatBubble({
	type,
	text,
	index,
}: {
	type: 'user' | 'bot';
	text: [string, string, string] | string;
	index: number;
}) {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 100);
	}, []);

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
			} ${
				isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
			} h-auto min-w-sm max-w-md min-h-[3rem] w-auto p-3 overflow-x-clip rounded-md transition-all duration-300`}>
			{typeof text === 'string' ? (
				<p className="text-MD">{text}</p>
			) : (
				<>
					<p className="text-md">{text[0]}</p>
					<p className="text-xs text-gray-400">
						{typeof text[1] === 'string' && text[1] !== '' ? (
							<span className="mr-2">{text[1]}</span>
						) : null}
						{typeof text[2] === 'string' && text[2] !== '' ? (
							<span className="mr-2">{text[2]}</span>
						) : null}
					</p>
				</>
			)}
		</div>
	);
}
