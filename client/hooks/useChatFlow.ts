// src/hooks/useChatFlow.ts
import { useCallback } from "react";
import { fetchAIResponse } from "@/services/api";
import { useSearchParams } from "next/navigation";

export const useChatFlow = (
  addMessage: (
    text: string,
    speaker: "You" | "Emma",
    score?: number,
    translation?: string,
    language_tip?: string,
    language_compliment?: string
  ) => Promise<void>,
  setAudioState: (state: any) => void,
  playAudio: (text: string) => Promise<void>
) => {
  const searchParams = useSearchParams();
  const roleplayParam = searchParams.get("roleplay");
  const roleplay = roleplayParam
    ? JSON.parse(decodeURIComponent(roleplayParam))
    : null;

  const handleChatFlow = useCallback(
    async (userMessage: string) => {
      await addMessage(userMessage, "You");

      setAudioState((prev) => ({ ...prev, isProcessing: true }));
      try {
        const data = await fetchAIResponse(userMessage, roleplay);
        await addMessage(
          data.text,
          "Emma",
          data.score,
          data.translation,
          data.language_tip,
          data.language_compliment
        );
        await playAudio(data.text);
      } catch (error) {
        console.error("Error in chat flow:", error);
        await addMessage(
          "I'm sorry, I couldn't process that request.",
          "Emma",
          0
        );
      } finally {
        setAudioState((prev) => ({ ...prev, isProcessing: false }));
      }
    },
    [addMessage, setAudioState, playAudio, roleplay]
  );

  return { handleChatFlow };
};
