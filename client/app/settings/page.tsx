"use client";

import { useRouter } from "next/navigation";
import {
  User,
  Bell,
  Lock,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Settings() {
  const router = useRouter();

  const settingsOptions = [
    {
      title: "Edit Profile",
      icon: <User className="w-6 h-6 text-blue-500" />,
      description: "Change your personal information",
      action: () => console.log("Edit Profile clicked"),
    },
    {
      title: "Notifications",
      icon: <Bell className="w-6 h-6 text-blue-500" />,
      description: "Manage your notification preferences",
      action: () => console.log("Notifications clicked"),
    },
    {
      title: "Recovery Method",
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      description: "Set up account recovery options",
      action: () => console.log("Recovery clicked"),
    },
    {
      title: "Support",
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
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
          <ChevronLeft className="w-6 h-6 text-gray-600" />
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
                {option.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
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
