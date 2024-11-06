"use client";

import { LucideIcon } from "lucide-react";

interface MenuButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function MenuButton({
  icon: Icon,
  label,
  isActive,
  onClick,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`
        flex flex-col items-center gap-0.5 py-1 px-2 rounded-full
        transition-colors duration-200
        ${isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}
      `}
    >
      <div
        className={`
          w-12 h-12 flex items-center justify-center rounded-full
          transition-all duration-200
          ${isActive ? "bg-blue-100 backdrop-blur-lg" : "bg-transparent"}
        `}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-medium hidden sm:inline">{label}</span>
    </button>
  );
}
