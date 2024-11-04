'use client'

import { useState } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'sent' | 'received';
};

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! How are you?', sender: 'received' },
    { id: 2, text: "I'm good, thanks! How about you?", sender: 'sent' },
    { id: 3, text: 'I’m doing well, thanks for asking!', sender: 'received' },
  ]);

  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: input, sender: 'sent' },
      ]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-gray-100">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'sent' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`rounded-lg p-2 max-w-xs ${
                message.sender === 'sent'
                  ? 'bg-green-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-300">
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 text-white bg-green-500 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
