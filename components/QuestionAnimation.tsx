'use client';

import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function QuestionAnimation() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 100);
	}, []);

	return (
		<div
			className={`${
				isLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
			} transition border-white text-white border rounded-md w-72 ml-auto p-2 text-left`}>
			<Typewriter
				options={{
					strings: ['What is the best way to play this hand?'],
					autoStart: true,
					delay: 50,
					loop: true,
					deleteSpeed: 9999999999,
					cursor: '',
				}}
			/>
		</div>
	);
}
