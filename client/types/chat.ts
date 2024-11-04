export interface Message {
    id: string;
    text: string;
    speaker: "You" | "Emma";
    timestamp: string;
  }
  
  export interface AudioState {
    isRecording: boolean;
    recordingComplete: boolean;
    isProcessing: boolean;
    isSpeaking: boolean;
    isMuted: boolean;
  }