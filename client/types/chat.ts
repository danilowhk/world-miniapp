// src/types/chat.ts

export interface InitializationState {
  audioInitialized: boolean;
  welcomeMessageSent: boolean;
  error: string | null;
}

export interface Message {
  id: string;
  text: string;
  translation?: string;
  speaker: "You" | "Emma";
  timestamp: string;
  score?: number;
  language_tip?: string;
  language_compliment?: string;
}

export interface AudioState {
  isRecording: boolean;
  recordingComplete: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
}
