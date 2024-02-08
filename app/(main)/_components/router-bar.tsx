"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface RouterBarProps {
  share?: boolean | null;
}

const RouterBar = ({ share }: RouterBarProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-start items-center">
      <ChevronLeft
        className="w-7 h-7 mr-4 cursor-pointer text-[#A0A4A8]"
        onClick={() => {
          if (share) {
            router.push("/home");
          } else {
            router.back();
          }
        }}
      />
    </div>
  );
};

export default RouterBar;
