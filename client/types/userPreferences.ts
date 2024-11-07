export interface LanguagePreferences {
  nativeLanguage: string;
  learningLanguage: string;
  proficiencyLevel: "beginner" | "intermediate" | "advanced";
}

export const DEFAULT_PREFERENCES: LanguagePreferences = {
  nativeLanguage: "Portuguese",
  learningLanguage: "English",
  proficiencyLevel: "beginner",
};
