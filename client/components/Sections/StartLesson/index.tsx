'use client'

import { useEffect, useState } from "react";
import { BadgePlus, TimerReset } from "lucide-react";
import { LessonsHeader } from "./lessons-header";

export default function LessonsSection({ lessons }: any) {
  const [dayOfWeek, setDayOfWeek] = useState("");

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "long" }; // Use 'long' for the full name of the day
    setDayOfWeek(date.toLocaleDateString("en-US", options));
  }, []);

  return (
    <div className="flex flex-col justify-between relative isolate overflow-hidden bg-gray-900 h-full px-6 py-4 text-center shadow-2xl">
      {" "}
      {/* Updated classes */}
      <LessonsHeader />
      <div className="flex flex-col justify-center items-center">
        <div className="pt-4 pb-4">
          <BadgePlus size={52} className="text-white" />
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-5xl">
          Unlock leagues
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-gray-300">
          Finish a lesson to start competing in the leagues.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/chat/roleplays"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started
          </a>
        </div>
      </div>
      {/* Rounded box for the end time at the bottom */}
      <div className="mt-4 rounded-lg bg-white p-4 mb-20 text-gray-900">
        {" "}
        {/* Added mb-20 for spacing */}
        <TimerReset size={24} className="inline-block mr-2 text-gray-900" />
        Ends on {dayOfWeek} at 11:59PM UTC
      </div>
      <svg
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
      >
        <circle
          r={512}
          cx={512}
          cy={512}
          fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
