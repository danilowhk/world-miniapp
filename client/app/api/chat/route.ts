// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  DEFAULT_PREFERENCES,
  LanguagePreferences,
} from "@/types/userPreferences";
import { generateRoleplayPrompt } from "@/utils/roleplayPrompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the response structure
const responseStructure = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description:
        "The AI assistant's response message, in a helpful way, teaching something in the learning language",
    },
    translation: {
      type: "string",
      description:
        "The translation of the message in the user's native language.",
    },
    score: {
      type: "number",
      description: "The user's current score, based on the conversation",
      minimum: 0,
      maximum: 100,
    },
    language_tip: {
      type: "string",
      description: "A helpful language tip related to the response",
    },
    language_compliment: {
      type: "string",
      description:
        "An encouraging compliment about the user's learning journey",
    },
  },
  required: [
    "message",
    "translation",
    "score",
    "language_tip",
    "language_compliment",
  ],
};

const generateSystemPrompt = (preferences: LanguagePreferences) => {
  return `You are Emma, an AI language teacher specialized in helping ${preferences.nativeLanguage} speakers learn ${preferences.learningLanguage}.

Key Information:
- Student's native language: ${preferences.nativeLanguage}
- Learning language: ${preferences.learningLanguage}
- Current level: ${preferences.proficiencyLevel}

Your teaching approach:
1. Always respond in ${preferences.learningLanguage} but provide ${preferences.nativeLanguage} translations when relevant
2. Give clear, practical examples
3. Focus on common daily situations and expressions
4. Correct any language mistakes gently
5. Provide cultural context when relevant
6. Encourage and motivate the student's progress

Remember to:
- Highlight key vocabulary or expressions
- Give practical tips for pronunciation when relevant`;
};

export async function POST(request: Request) {
  try {
    const {
      message,
      roleplay,
      preferences = DEFAULT_PREFERENCES,
    } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: roleplay
            ? generateRoleplayPrompt(roleplay, preferences)
            : generateSystemPrompt(preferences),
        },
        {
          role: "user",
          content: message,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "process_response",
            description: "Process the AI response with confidence score",
            parameters: responseStructure,
          },
        },
      ],
      tool_choice: {
        type: "function",
        function: { name: "process_response" },
      },
    });

    const responseContent = JSON.parse(
      completion.choices[0].message.tool_calls?.[0].function.arguments || "{}"
    );

    console.log("responseContent", responseContent);

    return NextResponse.json({
      text: responseContent.message,
      translation: responseContent.translation,
      score: responseContent.score,
      language_tip: responseContent.language_tip,
      language_compliment: responseContent.language_compliment,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
  }
}
