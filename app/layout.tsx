import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'PokerGPT',
	description: 'Answer any poker question.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={montserrat.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
