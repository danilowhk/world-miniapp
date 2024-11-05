"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Calculate progress percentage
  const progressPercentage =
    100 -
    ((timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) /
      (24 * 3600)) *
      100;

  const wordOfTheDay = "Perseverance";
  const wordMeaning =
    "Persistence in doing something despite difficulty or delay in achieving success.";

  return (
    <main className="min-h-screen bg-white px-4 py-4">
      {/* Header Title with Settings */}
      <div className="mb-6 flex justify-between items-start">
        <h1 className="text-4xl font-semibold leading-tight">
          Daily
          <br />
          <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Learning
          </span>
        </h1>
        <button
          onClick={() => router.push("/settings")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {/* Coins Card */}
      <div className="mb-8">
        <div className="bg-gray-900 rounded-3xl p-6 text-white">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">YOUR COINS</p>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold">{coinBalance}</span>
            </div>
          </div>

          {/* Next Reward Timer */}
          <div className="text-center mb-3">
            <p className="text-gray-400 text-sm mb-1">Next reward ready in:</p>
            <p className="font-medium">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Word of the Day Card */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border border-blue-100 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm">
            <span className="text-xl">📚</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Word of the Day
          </h2>
        </div>
        <div className="space-y-3">
          <p className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            {wordOfTheDay}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed bg-white bg-opacity-50 rounded-xl p-4 border border-gray-100">
            {wordMeaning}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 shadow-sm hover:from-purple-100 hover:to-pink-100 transition-all">
          <span className="text-2xl mb-2 block">🎯</span>
          <span className="font-medium text-sm text-gray-800 block">Goals</span>
        </button>
        <button className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-sm hover:from-green-100 hover:to-emerald-100 transition-all">
          <span className="text-2xl mb-2 block">📈</span>
          <span className="font-medium text-sm text-gray-800 block">
            Progress
          </span>
        </button>
      </div>
    </main>
  );
}
