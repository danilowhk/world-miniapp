"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  MiniKit,
  ResponseEvent,
  VerificationLevel,
  MiniAppVerifyActionPayload,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { useEffect } from "react";
import PayTransactionPage from "@/components/SendTransaction";

const verifyPayload = {
  action: "test",
  signal: "",
  verification_level: VerificationLevel.Orb,
};

export default function MintPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }
  }, [router]);

  return (
    <main className="relative flex flex-col h-screen bg-gray-800 text-white">
      <section className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Welcome to the App</h1>
      </section>

      <section className="absolute bottom-0 w-full h-1/3 bg-white rounded-t-3xl p-6 flex flex-col items-center justify-center text-gray-900">
        <p className="text-center text-lg mb-4">Start your journey today!</p>
        <PayTransactionPage />
      </section>
    </main>
  );
}
