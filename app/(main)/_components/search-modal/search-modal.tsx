"use client";

import { Input } from "@/components/ui/input";
import { useSearchModal } from "@/hooks/useSearchModal";
import { ChevronLeft } from "lucide-react";
import { NameAndList } from "./name-and-list";
import { SetStateAction, useEffect, useRef, useState } from "react";

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
          koreanName: "휴게실",
          englishName: "restRoom",
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
          koreanName: "콘센트",
          englishName: "outlet",
        },
        {
          koreanName: "ATM",
          englishName: "atm",
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

  return (
    <div className="w-full h-full z-20 fixed top-0 bottom-0 max-w-[450px] select-none bg-white">
      <div className="flex flex-col mt-6">
        <div className="flex flex-row justify-between items-center">
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
          />
        </div>
        <div className="w-full h-[1px] bg-[#DFE1E7] mt-3" />
        {datas.map((data, index) => {
          const filteredNameList = data.nameList.filter(
            (name) =>
              name.koreanName.includes(searchText) ||
              name.englishName.includes(searchText)
          );

          if (filteredNameList.length > 0) {
            return (
              <NameAndList
                key={index}
                name={data.type}
                nameList={filteredNameList}
              />
            );
          }

          // 필터링 결과가 비어있으면 아무것도 표시하지 않음
          return null;
        })}
      </div>
    </div>
  );
};
