import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTOtoGPT",
  description: "Use LLM's and solver data to answer any poker question.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.className} bg-black text-white`}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
