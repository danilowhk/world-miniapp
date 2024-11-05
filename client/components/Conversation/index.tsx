// app/chat/page.tsx
"use client";

import ChatBody from "./chat-body";

export default function ChatSection() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Chat Header */}
      {/* <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-lg font-semibold">Chat with Emma</h1>
      </header> */}

      {/* Chat Component */}
      <ChatBody />
    </div>
  );
}
