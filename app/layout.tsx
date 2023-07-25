import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { create } from 'zustand';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'PokerGPT',
	description: 'Answer any poker question.',
};

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={montserrat.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
