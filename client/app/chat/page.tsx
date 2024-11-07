'use client'

import { useState, useEffect } from 'react';
import LessonsSection from "@/components/Sections/StartLesson";
import { useSession } from "next-auth/react";



export default function ChatPage() {
  const database_url = process.env.NEXT_PUBLIC_DATABASE_URL;

  const { data } = useSession();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Example lesson object
  // const lessonExample = { 
  //   _id: "12389742", 
  //   userLessonType: "Ordering flowers", 
  //   learningLanguage: "English", 
  //   userScore: "100", 
  //   lifetime: "1", 
  //   createdAt: "2022-01-01", 
  //   completedAt: "2022-01-01" 
  // } 

  useEffect(() => {
    const fetchLessons = async () => {
      // if (!data) return;

      try {
        const response = await fetch(`${database_url}/lessons/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sub: data.user?.name, // assuming `data.user.sub` is the user identifier
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }

        const lessonsData = await response.json();
        setLessons(lessonsData);
      } catch (error) {
        setError('Error fetching lessons');
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [data]); // Effect runs when `data` changes (when session is available)

  return (
    <div className="flex flex-col h-screen bg-gray-100 pb-12">
      <LessonsSection lessons={lessons} loading={loading}/>
    </div>
  );
}