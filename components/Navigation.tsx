'use client';

import { Menu, X } from 'lucide-react';
import { useAppStore } from '@/components/Chat';

export default function Navigation() {
	const { navState, setNavState } = useAppStore();
	return (
		<div className="absolute top-0 left-0 z-10">
			<button
				className={`${
					navState === 'OPEN' ? 'opacity-0' : 'opacity-100'
				} transition-all absolute top-4 left-4 text-white`}
				onClick={() => setNavState('OPEN')}>
				<Menu size={30} />
			</button>
			<div className="relative">
				<button
					className={`${
						navState === 'CLOSED' ? 'opacity-0' : 'opacity-100'
					} transition-all absolute top-4 left-4 text-white`}
					onClick={() => setNavState('CLOSED')}>
					<X size={30} />
				</button>
			</div>
		</div>
	);
}
