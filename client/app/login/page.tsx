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

const verifyPayload = {
  action: "verify-ai",
  signal: "",
  verification_level: VerificationLevel.Orb,
};

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = () => {
    if (!MiniKit.isInstalled()) {
      console.error("MiniKit not installed");
      return;
    }
    MiniKit.commands.verify(verifyPayload);
  };

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppVerifyAction,
      async (response: MiniAppVerifyActionPayload) => {
        if (response.status === "error") {
          console.error("Error payload", response);
          return;
        }

        try {
          const verifyResponse = await fetch("/api/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payload: response as ISuccessResult,
              action: verifyPayload.action,
              signal: verifyPayload.signal,
            }),
          });

          const verifyResult = await verifyResponse.json();
          console.log("Verification Result:", verifyResult);

          if (verifyResult.status === 200) {
            console.log("Verification successful!");
            localStorage.setItem("isLoggedIn", "true");
            router.push("/onboarding/language");
          }
        } catch (error) {
          console.error("Verification error:", error);
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
    };
  }, [router]);

  return (
    <main className="relative flex flex-col h-screen bg-gray-800 text-white">
      <section className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Welcome to the App</h1>
      </section>

      <section className="absolute bottom-0 w-full h-1/3 bg-white rounded-t-3xl p-6 flex flex-col items-center justify-center text-gray-900">
        <p className="text-center text-lg mb-4">Start your journey today!</p>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition mb-4"
        >
          Sign In with World ID
        </button>
        <button
          onClick={() => {
            localStorage.setItem("isLoggedIn", "true");
            router.push("/onboarding/language");
          }}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          Skip for now
        </button>
      </section>
    </main>
  );
}
