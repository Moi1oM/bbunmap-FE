"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

interface NameAndListProps {
  name: string;
  nameList: any[];
}

export const NameAndList = ({ name, nameList }: NameAndListProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col mt-6 ml-4">
      <h1 className="text-xl font-semibold">{name}</h1>
      <div className="flex flex-row mt-4 flex-start overflow-x-scroll scrollbar-hide">
        {nameList.map((name, index) => {
          return (
            <Button
              key={index}
              className="bg-[#F5F6F6] text-[#74787D] mr-4"
              onClick={() => router.push(`/f?type=${name!.englishName}`)}
            >
              {name!.koreanName}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
