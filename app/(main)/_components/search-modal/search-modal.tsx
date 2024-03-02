"use client";

import { Input } from "@/components/ui/input";
import { useSearchModal } from "@/hooks/useSearchModal";
import { ChevronLeft } from "lucide-react";
import { NameAndList } from "./name-and-list";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";

export const SearchModal = () => {
  const { isSearchModalOpen, toggleSearchModal } = useSearchModal();
  const [searchText, setSearchText] = useState<string>("");
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
  };

  const datas = [
    {
      type: "공간",
      nameList: [
        {
          koreanName: "라운지",
          englishName: "lounge",
        },
        {
          koreanName: "열람실",
          englishName: "readingRoom",
        },
        {
          koreanName: "수면실",
          englishName: "sleepRoom",
        },
        {
          koreanName: "캐럴",
          englishName: "carol",
        },
        {
          koreanName: "스터디룸",
          englishName: "studyRoom",
        },
      ],
    },
    {
      type: "시설",
      nameList: [
        {
          koreanName: "정수기",
          englishName: "waterPurifier",
        },
        {
          koreanName: "자판기",
          englishName: "vendingMachine",
        },
        {
          koreanName: "프린터기",
          englishName: "printer",
        },
        {
          koreanName: "자동대출반납기",
          englishName: "autoReturn",
        },
        {
          koreanName: "컴퓨터",
          englishName: "computer",
        },
        {
          koreanName: "ATM",
          englishName: "atm",
        },
      ],
    },
    {
      type: "편의",
      nameList: [
        {
          koreanName: "식당",
          englishName: "restaurant",
        },
        {
          koreanName: "카페",
          englishName: "cafe",
        },
        {
          koreanName: "편의점",
          englishName: "convi",
        },
        {
          koreanName: "유니스토어",
          englishName: "unistore",
        },
      ],
    },
    {
      type: "장소",
      nameList: [
        {
          koreanName: "흡연구역",
          englishName: "smokingArea",
        },
        {
          koreanName: "셔틀버스",
          englishName: "shuttleBus",
        },
      ],
    },
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentRef = inputRef.current;
    if (currentRef !== null) {
      currentRef.addEventListener("touchstart", (e) => {
        e.preventDefault();
      });
      currentRef.focus();
    }
  }, []);
  let isEmpty = true;

  return (
    <div className="w-full h-full z-20 fixed top-0 bottom-0 max-w-[450px] select-none bg-white">
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between items-center mt-6">
          <ChevronLeft
            className="w-7 h-7 mr-2 ml-3 cursor-pointer"
            onClick={toggleSearchModal}
          />
          <Input
            ref={inputRef}
            type="text"
            placeholder="건물, 공간, 시설을 검색해보세요."
            value={searchText}
            onChange={handleSearchChange}
            onBlur={(e) => e.preventDefault()}
            className="mr-4"
          />
        </div>
        <div className="w-full h-[1px] bg-[#DFE1E7] mt-3" />

        <div className="overflow-auto h-full scrollbar-hide">
          {datas.map((data, index) => {
            const filteredNameList = data.nameList.filter(
              (name) =>
                name.koreanName.includes(searchText) ||
                name.englishName.includes(searchText)
            );

            if (filteredNameList.length > 0) {
              isEmpty = false;
              return (
                <NameAndList
                  key={index}
                  name={data.type}
                  nameList={filteredNameList}
                />
              );
            }

            // 필터링 결과가 비어있을 때
            return null;
          })}
          {/* 검색 결과 없을 때 */}
          {isEmpty && (
            <div className="flex flex-col justify-start items-center">
              <div className="relative w-full h-[60vh]">
                <Image
                  src="/no-result-search-image.png"
                  fill
                  className="object-contain"
                  alt="No Results"
                />
              </div>
              <span className="text-lg">검색어를 확인해주세요!</span>
            </div>
          )}
        </div>

        <div className="my-10 w-full h-[1px]" />
      </div>
    </div>
  );
};
