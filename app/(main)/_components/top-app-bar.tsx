"use client";

import { SearchIcon } from "lucide-react";
import { Heroes } from "./heros";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileButton } from "./profile-button";
import { useSearchModal } from "@/hooks/useSearchModal";

const TopAppBar = () => {
  const { isSearchModalOpen, toggleSearchModal } = useSearchModal();

  return (
    <div className="max-w-[450px] w-full flex flex-row justify-around items-center absolute top-0 h-18 z-20 bg-transparent mt-2">
      {/* <Heroes /> */}
      <div
        className="w-full mx-4 bg-white rounded-md cursor-pointer flex flex-row h-9 items-center justify-start shadow-lg"
        onClick={toggleSearchModal}
      >
        <SearchIcon className="w-4 h-4 mr-3 ml-2" />
        <span className="text-[#A0A4A8] select-none">
          공간, 시설, 건물을 검색해보세요.
        </span>
      </div>
      {/* <ProfileButton /> */}
    </div>
  );
};

export default TopAppBar;
