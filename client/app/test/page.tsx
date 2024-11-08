"use client";

// import { useEffect } from "react";

export default function ChatPage() {
  const fetchLessons = async () => {
    try {
      const response = await fetch("/api/lessons", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch lessons");
      }

      const data = await response.json();
      console.log("Lessons data:", data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 pb-12">
      <button
        onClick={fetchLessons}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Fetch Lessons
      </button>
    </div>
  );
}