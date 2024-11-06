"use client";

import React, { useEffect, useCallback } from "react";
import { User, Mic, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { useChat } from "@/hooks/useChat";
import { useRecording } from "@/hooks/useRecording";
import { useChatFlow } from "@/hooks/useChatFlow";
import { initializeAudioContext } from "@/services/audio";
import { useTimer } from "@/hooks/useTimer";

export default function ChatBody() {
  const {
    audioState,
    setAudioState,
    mediaRecorderRef,
    audioChunksRef,
    playAudio,
    toggleMute,
    initializeAudio,
  } = useAudio();

  const { messages, messagesEndRef, addMessage, getCurrentTime } = useChat();

  const handleTimeLimit = useCallback(() => {
    console.log("Time limit reached!");
    // Create conversation summary
    const conversationData = {
      id: Date.now().toString(),
      messages,
      startTime: messages[0]?.timestamp || new Date().toISOString(),
      endTime: new Date().toISOString(),
      duration: 180,
      totalMessages: messages.length,
      userMessages: messages.filter((m) => m.speaker === "You").length,
      assistantMessages: messages.filter((m) => m.speaker === "Emma").length,
    };

    console.log("=== Conversation Summary ===");
    console.log("Conversation ID:", conversationData.id);
    console.log("Start Time:", conversationData.startTime);
    console.log("End Time:", conversationData.endTime);
    console.log("Duration:", conversationData.duration, "seconds");
    console.log("Total Messages:", conversationData.totalMessages);
    console.log("User Messages:", conversationData.userMessages);
    console.log("Assistant Messages:", conversationData.assistantMessages);
    console.log("\n=== Full Conversation Log ===");
    messages.forEach((msg) => {
      console.log(`[${msg.timestamp}] ${msg.speaker}: ${msg.text}`);
    });
    console.log("=== End of Conversation ===\n");

    alert("Time limit reached! Check console for conversation data.");
  }, [messages]);

  const { formatTime, startTimer, stopTimer, resetTimer, isActive, time } =
    useTimer(10, handleTimeLimit); // Changed to 10 seconds for testing

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

  // Combined initialization and welcome message in a single useEffect
  useEffect(() => {
    let isInitialized = false;

    const init = async () => {
      if (isInitialized) return;
      
      console.log("Initializing...");
      const audioContext = initializeAudioContext();
      if (!audioContext) {
        console.warn("Audio might not work in this WebView environment");
      }

      await initializeAudio();

      // Only add welcome message if messages array is empty
      if (messages.length === 0) {
        console.log("Adding welcome message...");
        const welcomeMessage = "Hello! I'm Emma, your AI assistant. How can I help you today?";
        await addMessage(welcomeMessage, "Emma");
        await playAudio(welcomeMessage);
        // Start timer after welcome message is added
        startTimer();
      }

      isInitialized = true;
    };

    init();

    // Cleanup function
    return () => {
      isInitialized = false;
    };
  }, []); // Empty dependency array since we want this to run only once

  // Auto-scroll effect
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

  // Debug render
  console.log("Render - Timer status:", {
    isActive,
    time,
    messagesLength: messages.length,
  });

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-700 to-gray-900">
      {/* Header with Timer */}
      <div className="flex items-center p-4 text-white">
        <div className="text-sm">{getCurrentTime()}</div>
        <div className="flex-grow"></div>
        <div className="text-sm font-mono bg-gray-800 px-3 py-1 rounded-full">
          {formatTime()} {isActive ? "●" : "○"}
        </div>
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
        {!audioState.isSpeaking && "AI Assistant"}

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
                  <div
                    className={`mt-1 px-4 py-2 rounded-lg max-w-[80%] ${
                      message.speaker === "You"
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-tl-none"
                    }`}
                  >
                    <div className="text-xl">{message.text}</div>
                    {/* Bottom row for buttons and timestamp */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-1">
                        {/* <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <Languages className="text-white w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <RotateCw className="text-white w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <Snail className="text-white w-4 h-4" />
                        </button> */}
                      </div>
                      <span className="text-xs text-gray-400">
                        {message.timestamp}
                      </span>
                    </div>
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
