"use client";

import { Tab, useTabBarStore } from "@/hooks/useTabBar";
import { useRouter } from "next/navigation";
import React from "react";

interface TabBarButtonProps {
  iconSelected: React.ReactNode;
  iconNonSelected: React.ReactNode;
  title: Tab;
  displayName: string;
}

const TabBarButton = ({
  iconSelected,
  iconNonSelected,
  title,
  displayName,
}: TabBarButtonProps) => {
  const { currentTab, setTab } = useTabBarStore();
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => {
        setTab(title);
        // TODO: URL에 #뒤에 title 붙이기 (Anchor URL 사용)
        router.push(`/${title}`);
      }}
    >
      {currentTab === title ? iconSelected : iconNonSelected}
      <span
        className="text-xs font-bold "
        style={
          currentTab === title ? { color: "#000000" } : { color: "#9CA3AF" }
        }
      >
        {displayName ? displayName : title}
      </span>
    </div>
  );
};

export default TabBarButton;
