"use client";

import { Lock } from "lucide-react";

export function LessonsHeader() {
  return (
    <div className="w-full space-y-2">
      <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide pl-4">
        <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white">
          <Lock size={24} />
        </div>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-300"
          >
            <Lock size={18} className="text-gray-500" />
          </div>
        ))}
      </div>

      <div className="w-full px-4">
        <div className="bg-white rounded-md shadow-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Unlock leagues
            </h3>
            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-500">
              6d 22h 3m
            </p>
          </div>
          <p className="text-sm text-gray-600">
            Finish a lesson to start competing in the leagues.
          </p>
        </div>
      </div>
    </div>
  );
}
