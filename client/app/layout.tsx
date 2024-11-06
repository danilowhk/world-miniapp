// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import ClientErudaProvider from "@/providers/ClientErudaProvider";
import NextAuthProvider from "@/components/next-auth-provider";
import ClientOnlyRedirect from "@/components/OnboardingRedirect/ClientOnlyRedirect";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BottomNavigationMenu from "@/components/Menu/BottomNavigationMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const onboardingComplete = localStorage.getItem("onboardingComplete");

    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login");
    } else if (
      !onboardingComplete &&
      !pathname.startsWith("/onboarding") &&
      pathname !== "/login"
    ) {
      router.push("/onboarding/language");
    }
  }, [pathname, router]);

  // Don't render anything until after mounting to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const hideMenu =
    pathname.startsWith("/login") || pathname.startsWith("/onboarding");

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
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
