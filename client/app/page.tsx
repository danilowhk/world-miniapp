"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, Coins, Book, Target, TrendingUp } from "lucide-react";
import PayTransactionPage from "@/components/SendTransaction";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [coinBalance] = useState(150);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 23, minutes: 59, seconds: 59 };
        }

        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  const progressPercentage =
    100 -
    ((timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) /
      (24 * 3600)) *
      100;

  const wordOfTheDay = "Perseverance";
  const wordMeaning =
    "Persistence in doing something despite difficulty or delay in achieving success.";

  return (
    <main className="h-screen bg-gray-50 text-gray-800 pt-6 px-6 pb-36 space-y-8 overflow-y-auto">
      <PayTransactionPage />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span className="text-blue-600">Learning</span>
        </h1>
        <button
          onClick={() => router.push("/settings")}
          className="p-2 rounded-full hover:bg-gray-200 text-blue-600 transition-colors"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Coins Card */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Coins size={24} />
            <span className="text-2xl font-bold">{coinBalance}</span>
          </div>
          <button className="px-4 py-2 bg-white text-orange-500 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
            Claim Tokens
          </button>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-yellow-100">Next reward in:</p>
          <p className="font-medium">
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </p>
          <div className="w-full bg-yellow-300 bg-opacity-30 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Word of the Day */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Book size={24} className="text-blue-600" />
          <h2 className="font-semibold text-blue-600">Word of the Day</h2>
        </div>
        <p className="text-md font-bold text-gray-800 mb-2">{wordOfTheDay}</p>
        <p className="text-gray-600">{wordMeaning}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 rounded-lg bg-green-500 text-white flex flex-col items-center justify-center space-y-2 hover:bg-green-600 transition-colors shadow-md">
          <Target size={24} />
          <span className="font-medium">Goals</span>
        </button>
        <button className="p-4 rounded-lg bg-purple-500 text-white flex flex-col items-center justify-center space-y-2 hover:bg-purple-600 transition-colors shadow-md">
          <TrendingUp size={24} />
          <span className="font-medium">Progress</span>
        </button>
      </div>
    </main>
  );
}
