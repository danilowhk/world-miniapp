// app/api/lessons/route.ts
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

// Create Lesson
export async function createLesson(lessonData: any) {
  try {
    const response = await fetch(`${BACKEND_URL}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lessonData),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create lesson" },
        { status: response.status }
      );
    }

    const newLesson = await response.json();
    return NextResponse.json(newLesson);
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json({ error: "Error creating lesson" }, { status: 500 });
  }
}

// List All Lessons
export async function listLessons() {
  try {
    const response = await fetch(`${BACKEND_URL}/lessons`);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch lessons" },
        { status: response.status }
      );
    }

    const lessons = await response.json();
    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json({ error: "Error fetching lessons" }, { status: 500 });
  }
}

// List Lessons by User ID
export async function listLessonsByUserId(userId: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/lessons/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch lessons by user ID" },
        { status: response.status }
      );
    }

    const lessons = await response.json();
    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons by user ID:", error);
    return NextResponse.json({ error: "Error fetching lessons by user ID" }, { status: 500 });
  }
}

// Find Lesson by ID
export async function findLessonById(id: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/lessons/${id}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: response.status }
      );
    }

    const lesson = await response.json();
    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return NextResponse.json({ error: "Error fetching lesson" }, { status: 500 });
  }
}

// Add Message to Lesson
export async function addMessageToLesson(
  id: string,
  messageData: {
    author: string;
    type: string;
    text: string;
    timestamp: string;
    translatedAnswer?: string;
    languageTip?: string;
    languageCompliment?: string;
    score?: number;
  }
) {
  try {
    const response = await fetch(`${BACKEND_URL}/lessons/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to add message to lesson" },
        { status: response.status }
      );
    }

    const updatedLesson = await response.json();
    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error("Error adding message to lesson:", error);
    return NextResponse.json({ error: "Error adding message to lesson" }, { status: 500 });
  }
}
