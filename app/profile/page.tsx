"use client";

import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import { useUser } from "@clerk/nextjs";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { UserPublicMetadata } from "@/app/types";

export default function ProfilePage() {
  const { user } = useUser();
  const userPublicMetadata = user
    ? (user.publicMetadata as UserPublicMetadata)
    : null;
  const subscription = userPublicMetadata?.subscription
    ? userPublicMetadata.subscription
    : "free";

  return (
    <main className="relative flex min-h-screen flex-col gap-8 bg-black px-6 pt-24 text-white md:px-0">
      <Profile />

      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/"
          className="mb-8 flex h-8 w-24 gap-4 hover:border-b-2 hover:border-white"
        >
          <CornerUpLeft size={20} className="mt-2" />
          <h1 className="text-2xl">Back</h1>
        </Link>

        <div className="flex flex-col gap-6 text-xl">
          <h1>Email: {user?.primaryEmailAddress?.emailAddress}</h1>
          <h1>
            Subscription:{" "}
            <span className="font-bold uppercase">{subscription}</span>
          </h1>
          <h1>
            View or change your payment information{" "}
            <Link
              className="text-pio-blue hover:underline"
              href="https://billing.stripe.com/p/login/aEU3ePfqx1Mrf9S8ww"
            >
              here
            </Link>
            .
          </h1>
        </div>
      </div>

      <Footer />
    </main>
  );
}
