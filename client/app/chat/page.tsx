import LessonsSection from "@/components/Sections/StartLesson";

const database_url = process.env.DATABASE_URL;

export default async function ChatPage() {
  
  let lessons = [];

  try {
    const response = await fetch(`${database_url}/lessons/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: "",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch lessons");
    }

    lessons = await response.json();
  } catch (error) {
    console.error("Error fetching lessons:", error);
    // Optionally, you can set a fallback value for lessons or render an error message
    lessons = [];
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100 pb-12">
      <LessonsSection lessons={lessons} />
    </div>
  );
}