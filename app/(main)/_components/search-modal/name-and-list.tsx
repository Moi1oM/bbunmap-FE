"use client";

import { Button } from "@/components/ui/button";
import { useSearchKeywordConvi } from "@/hooks/useSearchKeywordConvi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface NameAndListProps {
  name: string;
  nameList: any[];
  entity: boolean;
  isConvi?: boolean;
}

export const NameAndList = ({
  name,
  nameList,
  entity,
  isConvi = false,
}: NameAndListProps) => {
  const router = useRouter();
  const { setSearchKeywordConviTrue, isSearchKeywordConvi } =
    useSearchKeywordConvi();

  useEffect(() => {
    console.log("1222", isConvi, nameList, isSearchKeywordConvi);
  }, [isConvi, nameList, isSearchKeywordConvi]);

  return (
    <div className="flex flex-col mt-6 ml-4">
      <h1 className="text-xl font-semibold">{name}</h1>
      <div className="flex flex-wrap mt-4 overflow-x-scroll scrollbar-hide">
        {nameList.map((name, index) => {
          return (
            <Button
              key={index}
              className="bg-[#F5F6F6] text-[#74787D] mr-[7px] mb-4"
              onClick={() => {
                // if (isConvi) {
                //   setSearchKeywordConviTrue();
                // }
                // router.push(`/f?type=${name!.englishName}&entity=${entity}`);
                if (isConvi) {
                  router.push(
                    `/f?type=${
                      name!.englishName
                    }&entity=${entity}&isConvi=${true}`
                  );
                } else {
                  router.push(`/f?type=${name!.englishName}&entity=${entity}`);
                }
              }}
            >
              {name!.koreanName}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
