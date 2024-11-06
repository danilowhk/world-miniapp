"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, MessageCircle, Trophy } from "lucide-react";
import MenuButton from "./MenuButton"; // Adjust the import path if necessary

const BottomNavigationMenu: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);

    // Define route paths for each tab
    const paths: { [key: string]: string } = {
      home: "/",
      chat: "/chat",
      ranking: "/ranking",
    };

    // Navigate to the selected path
    router.push(paths[tab]);
  };

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "chat", icon: MessageCircle, label: "Chat" },
    { id: "ranking", icon: Trophy, label: "Ranking" },
  ];

  return (
    <div className="w-full fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <nav
        className="
          bg-white bg-opacity-80 backdrop-blur-lg 
          border border-gray-200 
          rounded-full 
          flex justify-around items-center 
          px-4 py-2
          shadow-md shadow-gray-300
          w-11/12 mx-auto
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
};

export default BottomNavigationMenu;
