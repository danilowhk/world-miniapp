// app/chat/page.tsx
"use client";

// import ChatSection from "@/components/Conversation";
import LessonsSection from "@/components/Sections/StartLesson";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 pb-12">
        <LessonsSection />
    </div>
  );
}