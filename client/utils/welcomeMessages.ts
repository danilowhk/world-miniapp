interface Roleplay {
  id: number;
  name: string;
  level: string;
}

export const generateWelcomeMessage = (roleplay: Roleplay): string => {
  const contextMessages: { [key: string]: string } = {
    "Ordering flowers":
      "Welcome to our flower shop! What can I help you find today?",
    "At the dry cleaning": "Welcome! What can I help you with today?",
    "At the post office": "Hi there! What can I help you send today?",
    Lunchtime: "Hi! Can I tell you about today's specials?",
    "Business meeting": "Hi there! Ready to go through today's agenda?",
    "Ordering birthday cake": "Hi! Looking for a special birthday cake?",
    "Asking for directions": "Hi there! Need help finding your way?",
  };

  return contextMessages[roleplay.name] || "Hi! How can I help you today?";
};
