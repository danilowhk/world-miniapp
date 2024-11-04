// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import ClientErudaProvider from "@/providers/ClientErudaProvider";
import NextAuthProvider from "@/components/next-auth-provider";
import ClientOnlyRedirect from "@/components/OnboardingRedirect/ClientOnlyRedirect";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import BottomNavigationMenu from "@/components/Menu/BottomNavigationMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const onboardingComplete = localStorage.getItem("onboardingComplete");

      // Redirect to login if not logged in
      if (!isLoggedIn && pathname !== "/login") {
        router.push("/login");
      }
      // Only redirect to onboarding if it's not completed and we're not already in onboarding
      else if (
        !onboardingComplete &&
        !pathname.startsWith("/onboarding") &&
        pathname !== "/login"
      ) {
        router.push("/onboarding/language");
      }
    }
  }, [pathname, router]);

  const hideMenu =
    pathname.startsWith("/login") || pathname.startsWith("/onboarding");

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <NextAuthProvider>
          <ClientOnlyRedirect>
            <ClientErudaProvider>
              <MiniKitProvider>
                {children}
                {!hideMenu && <BottomNavigationMenu />}
              </MiniKitProvider>
            </ClientErudaProvider>
          </ClientOnlyRedirect>
        </NextAuthProvider>
      </body>
    </html>
  );
}
