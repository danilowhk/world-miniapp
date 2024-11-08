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
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const verifyPayload = {
  action: "test",
  signal: "",
  verification_level: VerificationLevel.Orb,
};

export default function LoginPage() {
  const router = useRouter();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const { data: session } = useSession();
  const [nonce, setNonce] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/onboarding/language");
    }
  }, [isAuthenticated, user, router]);

  const signInWithWallet = async () => {
    const res = await fetch(`/api/nonce`);
    const { nonce } = await res.json();
    console.log("nonce", nonce);
    setNonce(nonce);

    const generateMessageResult = MiniKit.commands.walletAuth({
      nonce: nonce,
      requestId: "0", // Optional
      expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      statement:
        "This is my statement and here is a link https://worldcoin.com/apps",
    });
    console.log("generateMessageResult", generateMessageResult);
    console.log("address ", MiniKit.walletAddress);
  };

  const handleLogin = () => {
    if (!MiniKit.isInstalled()) {
      console.error("MiniKit not installed");
      return;
    }
    MiniKit.commands.verify(verifyPayload);

    console.log(verifyPayload);
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

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(ResponseEvent.MiniAppWalletAuth, async (payload) => {
      if (payload.status === "error") {
        return;
      } else {
        const response = await fetch("/api/complete-siwe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: payload,
            nonce,
          }),
        });
        console.log("response", response);
      }
    });

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppWalletAuth);
    };
  }, []);

  return (
    <main className="relative flex flex-col h-screen bg-gray-800 text-white overflow-hidden font-roboto">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/people3.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <section className="flex-grow flex items-center justify-center relative z-10">
        <h1 className="text-6xl font-bold text-center">Welcome to Learning</h1>
      </section>

      <section className="relative z-10 w-full h-1/3 bg-white rounded-t-3xl p-6 flex flex-col items-center justify-center text-gray-900">
        <p className="text-center text-xl mb-4">Start your journey today!</p>
        <button
          onClick={signInWithWallet}
          className="bg-black text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 transition mb-4"
        >
          Sign In with World ID
        </button>
        <button
          onClick={() => {
            localStorage.setItem("isLoggedIn", "true");
            router.push("/onboarding/language");
          }}
          className="text-gray-600 hover:text-gray-800 transition text-lg"
        >
          Skip for now
        </button>
      </section>
    </main>
  );
}
