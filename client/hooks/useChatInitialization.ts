// hooks/useChatInitialization.ts
import { useState, useEffect } from 'react';
import { initializeAudioContext } from '@/services/audio';

interface ChatInitializationProps {
  messages: Array<any>;
  addMessage: (text: string, speaker: string) => Promise<any>;
  playAudio: (text: string) => Promise<void>;
  initializeAudio: () => Promise<void>;
  startTimer: () => void;
}

export function useChatInitialization({
  messages,
  addMessage,
  playAudio,
  initializeAudio,
  startTimer
}: ChatInitializationProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      // Only initialize once
      if (isInitialized) {
        return;
      }

      console.log("Starting initialization...");
      
      // Initialize audio context
      const audioContext = initializeAudioContext();
      if (!audioContext) {
        console.warn("Audio might not work in this WebView environment");
      }

      // Initialize audio system
      await initializeAudio();

      // Add welcome message only if no messages exist
      if (messages.length === 0) {
        console.log("Adding welcome message...");
        const welcomeMessage = "Hello! I'm Emma, your AI assistant. How can I help you today?";
        await addMessage(welcomeMessage, "Emma");
        await playAudio(welcomeMessage);
        startTimer();
      }

      setIsInitialized(true);
      console.log("Initialization complete!");
    };

    initialize().catch(console.error);
  }, [isInitialized]); // Only depend on isInitialized state

  return { isInitialized };
}