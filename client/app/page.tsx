"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const coinBalance = 150;
  const wordOfTheDay = "Perseverance";
  const wordMeaning =
    "Persistence in doing something despite difficulty or delay in achieving success.";

  // Mock next reward time - you should replace this with actual logic
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  // Calculate progress percentage (inverted, as time passes)
  const progressPercentage =
    100 -
    ((timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) /
      (24 * 3600)) *
      100;

  useEffect(() => {
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
  }, []);

  return (
    <main className="min-h-screen bg-white px-4 py-4">
      {/* Header Title */}
      <div className="mb-6">
        <h1 className="text-4xl font-semibold leading-tight">
          Daily
          <br />
          <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            Learning
          </span>
        </h1>
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
