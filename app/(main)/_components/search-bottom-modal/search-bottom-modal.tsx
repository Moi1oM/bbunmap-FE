import { useSearchBottomModal } from "@/hooks/useSearchBottomModal";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SearchBottomModalSkeleton } from "./skeleton-bottom-modal";

interface SearchBottomModalProps {
  searchType: string;
  buttonNumber?: number;
  searchContext?: boolean;
  searchText?: string;
}

type reponseType = {
  weekdayAvailable?: string;
  weekendAvailable?: string;
  examPeriodAvailable?: string;
  facilityTypeList?: string[];
};

const fetchBuildingData = async (buildingName: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/facilityList?buildingName=${buildingName}`
  );
  return response.json();
};

type EnglishName =
  | "lounge"
  | "readingRoom"
  | "sleepingRoom"
  | "carrel"
  | "studyRoom"
  | "waterPurifier"
  | "vendingMachine"
  | "printer"
  | "autoReturn"
  | "computer"
  | "atm"
  | "restaurant"
  | "cafe"
  | "convi"
  | "unistore"
  | "smokingArea"
  | "shuttleBus";

const nameMap: Record<EnglishName, string> = {
  lounge: "라운지",
  readingRoom: "열람실",
  sleepingRoom: "수면실",
  carrel: "캐럴",
  studyRoom: "스터디룸",
  waterPurifier: "정수기",
  vendingMachine: "자판기",
  printer: "프린터기",
  autoReturn: "자동대출반납기",
  computer: "컴퓨터",
  atm: "ATM",
  restaurant: "식당",
  cafe: "카페",
  convi: "편의점",
  unistore: "유니스토어",
  smokingArea: "흡연구역",
  shuttleBus: "셔틀버스",
};

const SearchBottomModal = ({
  searchType,
  buttonNumber,
  searchContext,
  searchText = "default",
}: SearchBottomModalProps) => {
  const router = useRouter();
  const { bottomModalSearchBuilding, setSearchBottomModalClose } =
    useSearchBottomModal();
  const buttonAvailable = buttonNumber !== undefined && buttonNumber >= 2;
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const { isPending, error, data } = useQuery<reponseType>({
    queryKey: ["buildingData", bottomModalSearchBuilding],
    queryFn: () => fetchBuildingData(bottomModalSearchBuilding),
  });

  useEffect(() => {
    console.log("updated", searchText, data);
  }, [data, searchText]);

  if (isPending) return <SearchBottomModalSkeleton />;
  if (error) return "An error has occurred: " + error.message;
  let koreanSearchText = searchText;
  if (/^[a-zA-Z\s]*$/.test(searchText)) {
    koreanSearchText = nameMap[searchText as EnglishName];
    console.log(koreanSearchText);
  }

  return (
    <div
      className={cn(
        buttonAvailable ? "h-[280px]" : "h-[320px]",
        "bottom-0 z-20 fixed bg-white max-w-[450px] w-full rounded-t-2xl"
      )}
    >
      <div className="flex flex-col justify-start">
        <div className="flex flex-row items-center justify-around mt-6">
          <div className="flex flex-col items-start justify-start">
            <span className="text-3xl text-[#1B1D1F] font-medium">
              {bottomModalSearchBuilding}
            </span>
            <div className="flex flex-row justify-start items-center mt-3">
              <span className="font-bold text-[#1B1D1F]">평일</span>
              <span className=" ml-4 text-[#1B1D1F]">
                {data.weekdayAvailable ?? "수집된 정보 없음"}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center mt-1">
              <span className="font-bold text-[#1B1D1F]">주말</span>
              <span className=" ml-4 text-[#1B1D1F]">
                {data.weekendAvailable ?? "수집된 정보 없음"}
              </span>
            </div>
          </div>
          <div className="relative w-24 h-24 rounded-md overflow-hidden">
            <Image
              src={
                isImgLoaded
                  ? `/external/${bottomModalSearchBuilding}.jpg`
                  : "/sample2.jpg"
              }
              sizes="(max-width: 600px) 100vw"
              fill
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt="Documents"
              onLoad={() => setIsImgLoaded(true)}
              onError={() => setIsImgLoaded(false)}
            />
          </div>
        </div>
        <div className="mt-4 overflow-hidden mx-10">
          {data?.facilityTypeList && data.facilityTypeList.length > 0 ? (
            data.facilityTypeList
              .sort((a, b) =>
                a.includes(koreanSearchText) && !b.includes(koreanSearchText)
                  ? -1
                  : 1
              )
              .map((facility, index) => (
                <span
                  key={index}
                  className={cn(
                    facility.includes(koreanSearchText)
                      ? "text-main"
                      : "text-[#1B1D1F]",
                    "overflow-hidden whitespace-nowrap overflow-ellipsis"
                  )}
                >
                  {facility}
                  {index < (data.facilityTypeList?.length || 0) - 1 ? ", " : ""}
                </span>
              ))
          ) : (
            <span className="text-[#1B1D1F]">수집된 공간 정보 없음</span>
          )}
        </div>

        <div className="flex flex-row items-center justify-evenly mt-8">
          <Button
            size="xlg"
            className={cn(
              "bg-[#FFE7EC] hover:bg-white hover:border-[1px] hover:border-main",
              !buttonAvailable && "w-full ml-8 mr-8"
            )}
            onClick={() => {
              if (searchContext) {
                router.push(
                  `/b?type=${searchType}&building=${bottomModalSearchBuilding}`
                );
              } else {
                router.push(`/b/detail?building=${bottomModalSearchBuilding}`);
              }
            }}
          >
            <span className="text-main text-lg font-semibold">
              상세정보 보기
            </span>
          </Button>
          {buttonAvailable && (
            <Button
              size="xlg"
              className="bg-white border-main border-[2px] hover:bg-[#FFE7EC]"
              onClick={() => {
                router.push(
                  `/floor?type=${searchType}&building=${bottomModalSearchBuilding}`
                );
              }}
            >
              <span className="text-main text-lg font-semibold">
                층별 안내도 보기
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBottomModal;
