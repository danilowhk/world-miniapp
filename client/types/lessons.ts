export interface Message {
    author: string;
    type: string;
    text: string;
    translatedAnswer?: string;
    languageTip?: string;
    languageCompliment?: string;
    score?: number;
    timestamp: Date;
  }
  
  export interface Lesson {
    userId: string;
    title: string;
    content?: Message[];
    createdAt?: Date;
    updatedAt?: Date; // includes `updatedAt` from `timestamps: true` in the schema
  }