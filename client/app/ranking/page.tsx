"use client";

import React from "react";
import { Hourglass } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-center p-4">
        <Hourglass className="w-16 h-16 text-gray-600 mx-auto mb-4 animate-spin [animation-timing-function:ease-in-out]" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Leaderboard Coming Soon!
        </h1>
        <p className="text-gray-600">
          We're working hard to bring you this feature. Stay tuned!
        </p>
      </div>
    </div>
  );
}