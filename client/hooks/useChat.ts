// src/hooks/useChat.ts
import { useState, useRef } from "react";
import { Message } from "../types/chat";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const addMessage = async (
    text: string,
    speaker: "You" | "Emma",
    score?: number,
    translation?: string,
    language_tip?: string,
    language_compliment?: string
  ) => {
    const newMessage: Message = {
      id: `${speaker}-${messageIdCounter.current++}-${Date.now()}`,
      text,
      translation,
      speaker,
      timestamp: getCurrentTime(),
      score,
      language_tip,
      language_compliment,
    };

    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  return {
    messages,
    messagesEndRef,
    addMessage,
    getCurrentTime,
  };
};
