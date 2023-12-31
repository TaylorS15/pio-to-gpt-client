import FAQ from "@/components/FAQ";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function Faq() {
  return (
    <main className="relative flex min-h-screen flex-col gap-8 bg-black pt-24 text-white">
      <Navigation />

      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/"
          className="mb-8 flex h-8 w-24 gap-4 hover:border-b-2 hover:border-white"
        >
          <CornerUpLeft size={20} className="mt-2" />
          <h1 className="text-2xl">Back</h1>
        </Link>

        <FAQ />
      </div>

      <Footer />
    </main>
  );
}
