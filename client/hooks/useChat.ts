// src/hooks/useChat.ts
import { useState, useRef } from 'react';
import { Message } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const addMessage = async (text: string, speaker: "You" | "Emma") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      speaker,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const getAIResponse = async (userMessage: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get AI response");
      return await response.json();
    } catch (error) {
      console.error("Error getting AI response:", error);
      return { text: "I'm sorry, I couldn't process that right now." };
    }
  };

  return {
    messages,
    messagesEndRef,
    addMessage,
    getAIResponse,
    getCurrentTime
  };
};