"use client";

import { useEffect, useState } from "react";
import { BadgePlus, TimerReset } from "lucide-react";
import { LessonsHeader } from "./lessons-header";
import LessonsTable from "./lessons-table";

export default function LessonsSection({ lessons, loading }: { lessons: any, loading: boolean }) {
  const [dayOfWeek, setDayOfWeek] = useState("");

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    setDayOfWeek(date.toLocaleDateString("en-US", options));
  }, []);

  if (lessons.length > 0 && !loading) {
    return (
      <div className="h-screen bg-gradient-to-b from-white to-blue-100 py-6 flex flex-col -mb-12">
        <LessonsHeader />
        <LessonsTable lessons={lessons} />
      </div>
    )
  } else {
    return (
      <div className="h-screen bg-gradient-to-b from-white to-blue-100 py-6 flex flex-col -mb-12">
        <LessonsHeader />
        <div className="flex flex-col px-6 pt-24">
          <div className="flex-grow flex flex-col justify-center items-center space-y-8">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full animate-flip-animation">
              <BadgePlus size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Unlock leagues
            </h2>
            <p className="max-w-md text-center text-lg text-gray-600">
              Finish a lesson to start competing in the leagues.
            </p>
            <a
              href="/chat/roleplays"
              className="rounded-full bg-gradient-to-br from-blue-400 to-blue-700 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all "
            >
              Get started
            </a>
          </div>
          <div className="mt-auto pt-16 text-purple-700 flex items-center justify-center">
            <TimerReset size={20} className="mr-2 text-purple-700" />
            Ends on {dayOfWeek} at 11:59PM UTC
          </div>
        </div>
      </div>
    );
  }
}
