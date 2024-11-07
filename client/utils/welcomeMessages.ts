interface Roleplay {
  id: number;
  name: string;
  level: string;
}

export const generateWelcomeMessage = (
  roleplay: Roleplay,
  userName: string
): string => {
  const contextMessages: { [key: string]: string } = {
    "Ordering flowers": `Welcome to our flower shop, ${userName}! What can I help you find today?`,
    "At the dry cleaning": `Welcome, ${userName}! What can I help you with today?`,
    "At the post office": `Hi there, ${userName}! What can I help you send today?`,
    Lunchtime: `Hi, ${userName}! Can I tell you about today's specials?`,
    "Business meeting": `Hi there, ${userName}! Ready to go through today's agenda?`,
    "Ordering birthday cake": `Hi, ${userName}! Looking for a special birthday cake?`,
    "Asking for directions": `Hi there, ${userName}! Need help finding your way?`,
  };

  return (
    contextMessages[roleplay.name] ||
    `Hi, ${userName}! How can I help you today?`
  );
};
