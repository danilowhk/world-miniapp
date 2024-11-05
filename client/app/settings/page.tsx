"use client";

import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();

  const settingsOptions = [
    {
      title: "Edit Profile",
      icon: "👤",
      description: "Change your personal information",
      action: () => console.log("Edit Profile clicked"),
    },
    {
      title: "Notifications",
      icon: "🔔",
      description: "Manage your notification preferences",
      action: () => console.log("Notifications clicked"),
    },
    {
      title: "Recovery Method",
      icon: "🔒",
      description: "Set up account recovery options",
      action: () => console.log("Recovery clicked"),
    },
    {
      title: "Support",
      icon: "💬",
      description: "Get help and contact support",
      action: () => console.log("Support clicked"),
    },
  ];

  return (
    <main className="min-h-screen bg-white px-4 py-4">
      {/* Header with Back Button */}
      <div className="mb-8 flex items-center">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">
        {settingsOptions.map((option, index) => (
          <button
            key={index}
            onClick={option.action}
            className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm 
                     hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4">
                <span className="text-2xl">{option.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Version Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">Version 1.0.0</p>
      </div>
    </main>
  );
}
