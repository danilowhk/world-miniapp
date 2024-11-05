'use client'

import { Lock } from 'lucide-react';

export function LessonsHeader() {
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="flex space-x-4 overflow-hidden p-2">
        <div className="h-16 w-16 flex items-center justify-center rounded-full ring-2 ring-white overflow-hidden"> 
          <Lock size={16} className="inline-block text-white" />
        </div>
        {[...Array(10)].map((_, index) => (
          <div key={index} className="h-12 w-12 flex items-center justify-center rounded-full ring-2 ring-white overflow-hidden mt-2">
            <Lock size={12} className="inline-block text-white" />
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full pt-4">
        <p className="text-balance text-xl font-semibold tracking-tight text-white">
          Unlock leagues
        </p>
        <p className="font-bold text-white">6d 22h 3m</p>
      </div>
      <div>
      
      </div>
      {/* Left-aligned text */}
      <p className="text-pretty text-md text-gray-300 pb-4 text-left mt-2">
        Finish a lesson to start competing in the leagues.
      </p>
      <div aria-hidden="true" className="w-full border-t border-gray-300" />
    </div>
  );
}