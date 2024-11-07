// src/services/api.ts
export const fetchAIResponse = async (
  message: string,
  roleplay?: any,
  preferences = {
    nativeLanguage: "Portuguese",
    learningLanguage: "English",
    proficiencyLevel: "beginner",
  }
) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, roleplay, preferences }),
  });

  if (!response.ok) throw new Error("Failed to get AI response");
  return response.json();
};

export const transcribeAudio = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append("audio", audioBlob);

  const response = await fetch("/api/stt", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to transcribe audio");
  return response.json();
};

export const generateSpeech = async (text: string) => {
  const response = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) throw new Error("Failed to generate speech");
  return response.blob();
};
