// src/components/LoadingScreen.tsx
import { User, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  status: string;
}

export function LoadingScreen({ status }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-900">
      <div className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center space-y-4 max-w-sm w-full mx-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-600 overflow-hidden mb-4 flex items-center justify-center">
            <User className="w-14 h-14 text-gray-300" />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-center w-12 h-12">
              <div className="absolute w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-medium text-white">Emma</h2>
        <div className="text-gray-400">AI Assistant</div>
        
        <div className="w-full bg-gray-700 rounded-full h-1 mt-4">
          <div className="bg-blue-500 h-1 rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex items-center space-x-2 text-blue-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}