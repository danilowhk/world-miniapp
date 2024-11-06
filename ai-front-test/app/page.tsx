"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  isUser: boolean;
  translation?: string;
  tip?: string;
  compliment?: string;
  score?: number;
}

interface Personality {
  name: string;
  description: string;
}

const PERSONALITIES: Personality[] = [
  {
    name: "Friendly Teacher",
    description:
      "Supportive, patient, and encouraging. Focuses on building confidence through positive reinforcement.",
  },
  {
    name: "Steve Jobs",
    description:
      "Visionary, direct, inspiring, and thoughtful. Speaks in simple yet profound statements.",
  },
  {
    name: "Morgan Freeman",
    description:
      "Wise, calming, and authoritative. Explains concepts with gravitas and clarity.",
  },
  {
    name: "Ellen DeGeneres",
    description:
      "Humorous, light-hearted, and engaging. Makes learning fun through witty observations.",
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedPersonality, setSelectedPersonality] = useState<Personality>(
    PERSONALITIES[0]
  );

  // Auto focus on input when component mounts and after each message
  useEffect(() => {
    inputRef.current?.focus();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      text: inputText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const chatInput = {
        current_user_message: inputText,
        previous_context:
          messages.length > 0 ? messages[messages.length - 2]?.text : undefined,
        previous_user_message:
          messages.length > 0 ? messages[messages.length - 1]?.text : undefined,
        username: "john", // You can make this dynamic
        user_lesson_type: "Beginner Phrases",
        personality_type: `${selectedPersonality.name} (${selectedPersonality.description})`,
        native_language: "portuguese",
        learning_language: "english",
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatInput),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      const botMessage: Message = {
        text: data.bot_answer,
        isUser: false,
        translation: data.translated_answer,
        tip: data.language_tip,
        compliment: data.language_compliment,
        score: data.score,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-2xl flex flex-col h-[80vh]">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose AI Personality:
          </label>
          <select
            value={selectedPersonality.name}
            onChange={(e) => {
              const personality = PERSONALITIES.find(
                (p) => p.name === e.target.value
              );
              if (personality) setSelectedPersonality(personality);
            }}
            className="w-full p-2 border rounded focus:outline-none"
          >
            {PERSONALITIES.map((personality) => (
              <option key={personality.name} value={personality.name}>
                {personality.name} - {personality.description}
              </option>
            ))}
          </select>
        </div>

        {/* Chat messages container */}
        <div className="flex-1 overflow-y-auto mb-4 p-4 border rounded-lg">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.isUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <div>{message.text}</div>
                {message.translation && (
                  <div className="text-sm text-gray-600 mt-2">
                    {message.translation}
                  </div>
                )}
                {message.tip && (
                  <div className="text-sm text-blue-600 mt-2">
                    💡 {message.tip}
                  </div>
                )}
                {message.compliment && (
                  <div className="text-sm text-green-600 mt-2">
                    ✨ {message.compliment}
                  </div>
                )}
                {message.score && (
                  <div className="text-sm text-purple-600 mt-2">
                    Score: {message.score}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block p-3 rounded-lg bg-gray-100">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-2 border rounded focus:outline-none"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
