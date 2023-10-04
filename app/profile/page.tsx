"use client";

import Footer from "@/components/Footer";
import Profile from "@/components/Profile";
import { useUser } from "@clerk/nextjs";
import { CornerUpLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { UserPublicMetadata } from "@/app/types";
import { useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const { user } = useUser();
  const userPublicMetadata = user
    ? (user.publicMetadata as UserPublicMetadata)
    : null;
  const subscription = userPublicMetadata?.subscription
    ? userPublicMetadata.subscription
    : "free";
  const hasCancelled = userPublicMetadata?.hasCancelled
    ? userPublicMetadata.hasCancelled
    : false;

  const [confirmCancellation, setConfirmCancellation] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  function handleSubscriptionCancel() {
    setConfirmCancellation(false);
    setIsCancelling(true);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/subscription/cancel`,
      headers: {
        Authorization: `Bearer ${user?.id}`,
      },
      data: {
        userId: user?.id,
      },
    })
      .then(() => {
        setIsCancelling(false);
      })
      .catch((err) => {
        setIsCancelling(false);
        console.error(err);
      });
  }

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

        <div className="flex flex-col gap-6 text-2xl">
          <h1>Email: {user?.primaryEmailAddress?.emailAddress}</h1>
          <h1>
            Subscription: <span className="font-bold">{subscription}</span>
          </h1>
          {!hasCancelled &&
            !confirmCancellation &&
            !isCancelling &&
            subscription !== "free" && (
              <button
                className="w-max text-lg hover:underline"
                onClick={() => setConfirmCancellation(true)}
              >
                Cancel Subscription
              </button>
            )}
          {confirmCancellation && (
            <div className="flex flex-col gap-3">
              <p className="text-lg">
                Are you sure you want to cancel your subscription? You will
                still be able to use GTOtoGPT until the end of your billing
                period.
              </p>
              <div className="flex gap-8">
                <button
                  className="h-7 w-16 rounded-md bg-white text-sm text-black transition hover:bg-white/70"
                  onClick={() => handleSubscriptionCancel()}
                >
                  Yes
                </button>
                <button
                  className="h-7 w-16 rounded-md bg-white text-sm text-black transition hover:bg-white/70"
                  onClick={() => setConfirmCancellation(false)}
                >
                  No
                </button>
              </div>
            </div>
          )}
          {isCancelling && (
            <div className="w-min">
              <Loader2 className="mx-auto mt-4 animate-spin" size={25} />
            </div>
          )}
          {hasCancelled && (
            <h1>
              You have cancelled your subscription. You will still be able to
              use GTOtoGPT until the end of your billing period.
            </h1>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
