import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import  ReactQueryProvider from "@/components/ReactQueryProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "GTOtoGPT",
  description: "Use LLM's and solver data to answer any poker question.",
};
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html lang="en">
          <body className={`${montserrat.className} bg-black text-white`}>
            {children}
            <Analytics />
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
