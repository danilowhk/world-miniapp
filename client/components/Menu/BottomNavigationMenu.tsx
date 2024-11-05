import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface MenuButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function MenuButton({ icon, label, isActive, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-1 py-1 px-3 rounded-xl
        transition-all duration-200
        ${
          isActive
            ? "text-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50"
            : "text-gray-400 hover:text-gray-600"
        }
      `}
    >
      <div
        className={`
        w-10 h-10 flex items-center justify-center rounded-full
        transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm"
            : "bg-gray-50"
        }
      `}
      >
        <span className="text-xl">{icon}</span>
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

export default function BottomNavigationMenu() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);

    // Define route paths for each tab
    let path = "/";
    switch (tab) {
      case "home":
        path = "/";
        break;
      case "chat":
        path = "/chat";
        break;
      case "ranking":
        path = "/ranking";
        break;
      default:
        break;
    }

    // Navigate to the selected path
    router.push(path);
  };

  const menuItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "chat", icon: "💭", label: "Chat" },
    { id: "ranking", icon: "🏆", label: "Ranking" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 px-2 pb-2">
      <nav
        className="
        bg-white border border-gray-100 
        rounded-2xl shadow-lg shadow-gray-200/50
        flex justify-around items-center py-2 px-1
        backdrop-blur-lg bg-white/95
      "
      >
        {menuItems.map((item) => (
          <MenuButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.id}
            onClick={() => handleNavigation(item.id)}
          />
        ))}
      </nav>
    </div>
  );
}
