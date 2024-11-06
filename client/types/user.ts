export interface User {
    name: string;
    email: string;
    coins?: number;
    interests?: string[];
    nativeLanguage: string;
    learningLanguage: string;
    createdAt?: Date;
    progress?: {
      vocabulary: number;
      lessonsCompleted: number;
      dailyStreak: number;
    };
    updatedAt?: Date;
  }
  