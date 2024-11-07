"use client";

import React, { useEffect, useCallback, useState } from "react";
import {
  Mic,
  Volume2,
  VolumeX,
  ArrowLeft,
  MoreVertical,
  Globe2,
  Trophy,
  Lightbulb,
} from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { useChat } from "@/hooks/useChat";
import { useRecording } from "@/hooks/useRecording";
import { useChatFlow } from "@/hooks/useChatFlow";
import { initializeAudioContext } from "@/services/audio";
import { useTimer } from "@/hooks/useTimer";
import { useSearchParams } from "next/navigation";
import { generateWelcomeMessage } from "@/utils/welcomeMessages";

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

  const { messages, messagesEndRef, addMessage } = useChat();

  const [expandedDetails, setExpandedDetails] = useState<{
    [key: string]: { translation?: boolean; score?: boolean; tips?: boolean };
  }>({});

  const toggleDetail = (
    messageId: string,
    detail: "translation" | "score" | "tips"
  ) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        [detail]: !prev[messageId]?.[detail],
      },
    }));
  };

  const handleTimeLimit = useCallback(() => {
    console.log("Time limit reached!");
    // Create conversation summary
    const conversationData = {
      id: Date.now().toString(),
      messages,
      startTime: messages[0]?.timestamp || new Date().toISOString(),
      endTime: new Date().toISOString(),
      duration: 600,
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
    useTimer(600, handleTimeLimit);

  const { handleChatFlow } = useChatFlow(
    async (
      text: string,
      speaker: "You" | "Emma",
      score?: number,
      translation?: string,
      language_tip?: string,
      language_compliment?: string
    ) => {
      const message = await addMessage(
        text,
        speaker,
        score,
        translation,
        language_tip,
        language_compliment
      );
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

  const searchParams = useSearchParams();

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

      if (messages.length === 0) {
        console.log("Adding welcome message...");
        let welcomeMessage =
          "Hello! I'm Emma, your AI assistant. How can I help you today?";

        const roleplayParam = searchParams.get("roleplay");
        if (roleplayParam) {
          try {
            const roleplay = JSON.parse(decodeURIComponent(roleplayParam));
            welcomeMessage = generateWelcomeMessage(roleplay);
          } catch (error) {
            console.error("Error parsing roleplay data:", error);
          }
        }

        await addMessage(welcomeMessage, "Emma");
        await playAudio(welcomeMessage);
        startTimer();
      }

      isInitialized = true;
    };

    init();

    return () => {
      isInitialized = false;
    };
  }, []); // Empty dependency array since we want this to run only once

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
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <button className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="ml-2 text-xl font-semibold text-gray-700">Emma</div>
          {/* Timer */}
          <div className="ml-4 text-sm font-mono bg-gray-100 px-3 py-1 rounded-full text-gray-700">
            {formatTime()} {isActive ? "●" : "○"}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-100"
            title={audioState.isMuted ? "Unmute" : "Mute"}
          >
            {audioState.isMuted ? (
              <VolumeX className="w-6 h-6 text-gray-600" />
            ) : (
              <Volume2 className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.speaker === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 ${
                  message.speaker === "You"
                    ? "bg-blue-500 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                <div className="text-base">{message.text}</div>
                {message.speaker === "Emma" && (
                  <>
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex space-x-2">
                        {message.translation && (
                          <button
                            onClick={() =>
                              toggleDetail(message.id, "translation")
                            }
                            className={`w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center ${
                              expandedDetails[message.id]?.translation
                                ? "bg-gray-200"
                                : ""
                            }`}
                            title="Translation"
                          >
                            <Globe2 className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        {(message.language_tip ||
                          message.language_compliment) && (
                          <button
                            onClick={() => toggleDetail(message.id, "tips")}
                            className={`w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center ${
                              expandedDetails[message.id]?.tips
                                ? "bg-gray-200"
                                : ""
                            }`}
                            title="Tips & Compliments"
                          >
                            <Lightbulb className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        {message.score !== undefined && (
                          <button
                            onClick={() => toggleDetail(message.id, "score")}
                            className={`w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center ${
                              expandedDetails[message.id]?.score
                                ? "bg-gray-200"
                                : ""
                            }`}
                            title="Score"
                          >
                            <Trophy className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-gray-700">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Expandable Content */}
                    {expandedDetails[message.id]?.translation &&
                      message.translation && (
                        <div className="text-sm text-gray-500 mt-2 italic">
                          {message.translation}
                        </div>
                      )}
                    {expandedDetails[message.id]?.score &&
                      message.score !== undefined && (
                        <div className="text-sm text-gray-500 mt-2">
                          Score: {message.score}/100
                        </div>
                      )}
                    {expandedDetails[message.id]?.tips && (
                      <>
                        {message.language_tip && (
                          <div className="text-sm text-blue-600 mt-2">
                            💡 {message.language_tip}
                          </div>
                        )}
                        {message.language_compliment && (
                          <div className="text-sm text-green-600 mt-2">
                            ⭐ {message.language_compliment}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Status Indicators */}
        {audioState.isRecording && (
          <div className="flex items-center justify-center mt-4 text-gray-700">
            <div className="animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm">Recording...</span>
            </div>
          </div>
        )}

        {audioState.isProcessing && (
          <div className="flex items-center justify-center mt-4 text-gray-700">
            <div className="animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Mic Button */}
      <button
        onClick={handleToggleRecording}
        className={`w-14 h-14 rounded-full flex items-center justify-center ${
          audioState.isRecording ? "bg-red-500" : "bg-blue-500"
        } ${
          audioState.isSpeaking ? "opacity-50 cursor-not-allowed" : ""
        } fixed right-8 bottom-28`}
        disabled={audioState.isSpeaking}
      >
        <Mic className="w-6 h-6 text-white" />
      </button>
      {/* Padding at the bottom */}
      <div className="pb-20"></div>
    </div>
  );
}
