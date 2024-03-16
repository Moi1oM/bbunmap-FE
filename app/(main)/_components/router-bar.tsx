"use client";

import { usePlaceRecommand } from "@/hooks/usePlaceRecommand";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface RouterBarProps {
  share?: boolean | null;
  fullRecommand?: boolean | null;
  fromRecommand?: boolean;
}

const RouterBar = ({ share, fullRecommand, fromRecommand }: RouterBarProps) => {
  const router = useRouter();
  const { setFullRecommandClose, refreshKeyword, setFullRecommandOpen } =
    usePlaceRecommand();

  return (
    <div className="flex flex-row justify-start items-center">
      <ChevronLeft
        className="w-7 h-7 mr-4 cursor-pointer text-[#A0A4A8]"
        onClick={() => {
          if (share) {
            router.push("/home");
          } else if (fullRecommand) {
            setFullRecommandClose();
            refreshKeyword();
          } else {
            if (fromRecommand) {
              setFullRecommandOpen();
            }
            router.back();
          }
        }}
      />
    </div>
  );
};

export default RouterBar;
