// src/hooks/useChat.ts
import { useState, useRef } from 'react';
import { Message } from '../types/chat';

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

  const addMessage = async (text: string, speaker: "You" | "Emma") => {
    const newMessage: Message = {
      id: `${speaker}-${messageIdCounter.current++}-${Date.now()}`,
      text,
      speaker,
      timestamp: getCurrentTime(),
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  return {
    messages,
    messagesEndRef,
    addMessage,
    getCurrentTime
  };
};