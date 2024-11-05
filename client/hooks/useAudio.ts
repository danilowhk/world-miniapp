// src/hooks/useAudio.ts
import { useState, useRef, useCallback } from 'react';
import { AudioState } from '../types/chat';

export const useAudio = () => {
  const [audioState, setAudioState] = useState<AudioState>({
    isRecording: false,
    recordingComplete: false,
    isProcessing: false,
    isSpeaking: false,
    isMuted: false
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const initializeAudio = useCallback(async () => {
    audioRef.current = new Audio();
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.preload = "auto";

    audioRef.current.onplay = () => setAudioState(prev => ({ ...prev, isSpeaking: true }));
    audioRef.current.onended = () => setAudioState(prev => ({ ...prev, isSpeaking: false }));
    audioRef.current.onerror = () => setAudioState(prev => ({ ...prev, isSpeaking: false }));

    // Return cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.onplay = null;
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
      }
    };
  }, []);

  const playAudio = useCallback(async (text: string) => {
    if (!audioState.isMuted) {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        const response = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) throw new Error("Failed to generate speech");

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (!audioRef.current) {
          audioRef.current = new Audio();
        }

        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.preload = "auto";
        audioRef.current.src = audioUrl;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setAudioState(prev => ({ ...prev, isSpeaking: true }));
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              setAudioState(prev => ({ ...prev, isSpeaking: false }));
            });
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        setAudioState(prev => ({ ...prev, isSpeaking: false }));
      }
    }
  }, [audioState.isMuted]);

  const toggleMute = useCallback(() => {
    if (audioState.isSpeaking && !audioState.isMuted && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAudioState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, [audioState.isSpeaking, audioState.isMuted]);

  return {
    audioState,
    setAudioState,
    audioRef,
    mediaRecorderRef,
    audioChunksRef,
    playAudio,
    toggleMute,
    initializeAudio
  };
};