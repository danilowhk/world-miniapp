"use client";

import React, { useEffect } from "react";
import { User, Languages, RotateCw, Mic, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { useChat } from "@/hooks/useChat";
import { useRecording } from "@/hooks/useRecording";
import { useChatFlow } from "@/hooks/useChatFlow";
import { initializeAudioContext } from "@/services/audio";

export default function ChatBody() {
  const {
    audioState,
    setAudioState,
    mediaRecorderRef,
    audioChunksRef,
    playAudio,
    toggleMute,
    initializeAudio
  } = useAudio();

  const {
    messages,
    messagesEndRef,
    addMessage,
    getCurrentTime
  } = useChat();

  const { handleChatFlow } = useChatFlow(
    async (text: string, speaker: "You" | "Emma") => {
      const message = await addMessage(text, speaker);
      if (speaker === "Emma") {
        await playAudio(text);
      }
    },
    setAudioState,
    playAudio
  );
  
  const { startRecording, stopRecording } = useRecording(
    mediaRecorderRef,
    audioChunksRef,
    setAudioState,
    handleChatFlow
  );

  // Combined initialization useEffect
  useEffect(() => {
    const init = async () => {
      // Initialize audio context
      const audioContext = initializeAudioContext();
      if (!audioContext) {
        console.warn("Audio might not work in this WebView environment");
      }
      
      // Initialize audio
      await initializeAudio();

      // Add welcome message if needed
      if (messages.length === 0) {
        const welcomeMessage = "Hello! I'm Emma, your AI assistant. How can I help you today?";
        const message = await addMessage(welcomeMessage, "Emma");
        await playAudio(welcomeMessage);
      }
    };

    init();
  }, []); // Empty dependency array since this should only run once

  // Auto-scroll effect (can't be combined as it needs to run on messages change)
  useEffect(() => {
    const element = messagesEndRef.current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleToggleRecording = () => {
    if (audioState.isSpeaking) return;

    if (audioState.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-700 to-gray-900">
      {/* Header */}
      <div className="flex items-center p-4 text-white">
        <div className="text-sm">{getCurrentTime()}</div>
        <div className="flex-grow"></div>
        <div className="flex items-center gap-2"></div>
      </div>

      {/* Navigation */}
      <div className="flex items-center px-4 text-white">
        <button className="p-2">←</button>
        <div className="text-xl ml-2">Call Mode</div>
        <div className="flex-grow"></div>
        <button
          onClick={toggleMute}
          className="p-2 hover:bg-gray-600 rounded-full transition-colors"
          title={audioState.isMuted ? "Unmute" : "Mute"}
        >
          {audioState.isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>
        <button className="p-2">⋮</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center pt-6 text-white">
        {/* Profile Image */}
        <div className="w-20 h-20 rounded-full bg-gray-600 overflow-hidden mb-4 flex items-center justify-center">
          <User className="w-12 h-12 text-gray-300" />
        </div>

        {/* Name and Status */}
        <div className="text-2xl font-medium mb-1">Emma</div>
        <div className="text-gray-400 mb-4 flex items-center gap-2">
          {audioState.isSpeaking && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Speaking</span>
            </div>
          )}
          {!audioState.isSpeaking && "AI Assistant"}
        </div>

        {/* Messages Section */}
        <div className="w-full flex-grow overflow-y-auto px-4 pb-4">
          <div className="bg-gray-800 rounded-lg p-4 h-full overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.speaker === "You" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{message.speaker}</span>
                    <span>{message.timestamp}</span>
                  </div>
                  <div
                    className={`mt-1 px-4 py-2 rounded-lg max-w-[80%] ${
                      message.speaker === "You" ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Status Indicators */}
            {audioState.isRecording && (
              <div className="flex items-center justify-center mt-4 text-gray-400">
                <div className="animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Recording...</span>
                </div>
              </div>
            )}

            {audioState.isProcessing && (
              <div className="flex items-center justify-center mt-4 text-gray-400">
                <div className="animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Processing...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-around items-center p-6">
        {/* <button className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
          <User className="text-white w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
          <Languages className="text-white w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
          <RotateCw className="text-white w-6 h-6" />
        </button> */}
        <button
          onClick={handleToggleRecording}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            audioState.isRecording ? "bg-red-600" : "bg-blue-600"
          } ${audioState.isSpeaking ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={audioState.isSpeaking}
        >
          <Mic className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
}