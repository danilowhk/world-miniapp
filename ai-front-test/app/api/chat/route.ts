import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define input structure
interface ChatInput {
  current_user_message: string;
  previous_context?: string;
  previous_user_message?: string;
  username?: string;
  user_interest?: string[];
  user_lesson_type: string;
  user_score?: number;
  personality_type: string;
  native_language: string;
  learning_language: string;
}

// Define the response structure
const responseStructure = {
  type: "object",
  properties: {
    bot_answer: {
      type: "string",
      description:
        "The main AI response in a helpful way, teaching something, in the learning language, with the its personality type",
    },
    translated_answer: {
      type: "string",
      description:
        "The translation of bot_answer in the user's native language",
    },
    language_tip: {
      type: "string",
      description: "A helpful language tip related to the response",
    },
    language_compliment: {
      type: "string",
      description:
        "An encouraging compliment or comment about the user's learning journey, personalized to the user's conversation",
    },
    score: {
      type: "number",
      description: "The user's current score, based on the conversation",
    },
  },
  required: [
    "bot_answer",
    "translated_answer",
    "language_tip",
    "language_compliment",
    "score",
  ],
};

export async function POST(request: NextRequest) {
  console.log("API route hit");

  try {
    if (!process.env.OPENAI_API_KEY) {
      console.log("No OpenAI API key found");
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const chatInput: ChatInput = await request.json();
    console.log("Request received:", {
      method: request.method,
      headers: Object.fromEntries(request.headers),
    });

    console.log("Chat Input Details:");
    console.log({
      message: chatInput.current_user_message,
      personality: chatInput.personality_type,
      native_language: chatInput.native_language,
      learning_language: chatInput.learning_language,
    });

    const promptStructure: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [
        {
          role: "system",
          content: `You are a language learning assistant with the personality of ${chatInput.personality_type}. 
                   You should embody this personality in your teaching style and responses.
                   The user's native language is ${chatInput.native_language} and they are learning ${chatInput.learning_language}.
                   Your role is to teach the learning language in a structured format that helps them learn effectively.
                   Always correct any language mistakes in a friendly and encouraging way, staying true to your chosen personality.`,
        },
        {
          role: "user",
          content: JSON.stringify(chatInput),
        },
      ],
      model: "gpt-4",
      tools: [
        {
          type: "function",
          function: {
            name: "provide_language_response",
            description: "Provide a structured language learning response",
            parameters: responseStructure,
          },
        },
      ],
      tool_choice: {
        type: "function" as const,
        function: { name: "provide_language_response" },
      },
    };

    console.log("About to call OpenAI API");

    const completion = await openai.chat.completions.create(promptStructure);

    console.log("OpenAI API call completed");

    const responseContent = JSON.parse(
      completion.choices[0].message.tool_calls?.[0].function.arguments || "{}"
    );

    console.log("Final response:", responseContent);

    return NextResponse.json(responseContent);
  } catch (error) {
    console.error("Error details:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to process chat message", details: errorMessage },
      { status: 500 }
    );
  }
}
