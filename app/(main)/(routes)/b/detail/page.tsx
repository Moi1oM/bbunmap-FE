"use client";

import { EntranceNum } from "@/app/_const/entrance";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BuildingDetailProps {}

interface FacilityInfo {
  weekdayAvailable?: string;
  weekendAvailable?: string;
  examPeriodAvailable?: string;
  facilityTypeList?: string[];
  placeExplain?: string;
}

const fetchFacilityList = async (
  buildingName: string
): Promise<FacilityInfo> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/facilityList?buildingName=${buildingName}`
  );
  return response.json();
};

const BuildingDetail = () => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();
  const building: string = params.get("building") || "default";
  const shareString: string | null = params.get("share");
  const share: boolean | null =
    shareString !== null ? shareString.toLowerCase() === "true" : null;

  const {
    isPending: facilityIsPending,
    error: facilityError,
    data: facData,
  } = useQuery<FacilityInfo>({
    queryKey: ["facilityDetailList", building],
    queryFn: () => {
      const promise = fetchFacilityList(building!);
      toast.promise(promise, {
        loading: "시설 목록을 불러오는 중입니다...",
        success: "시설 목록 로딩 성공!",
        error: "시설 목록 로딩에 실패했습니다.",
      });
      return promise;
    },
  });

  const facilityList = [
    {
      englishName: "lounge",
      koreanName: "라운지",
      image: "/facility/lounge.png",
    },
    {
      koreanName: "캐럴/스터디룸",
      englishName: "carrel;studyRoom",
      image: "/facility/carol.png",
    },
    {
      koreanName: "열람실",
      englishName: "readingRoom",
      image: "/facility/studyRoom.png",
    },
    {
      koreanName: "카페/식당",
      englishName: "cafe;restaurant",
      image: "/facility/cafe.png",
    },
    {
      koreanName: "편의",
      englishName: "convenience",
      image: "/facility/convi.png",
    },
  ];

  useEffect(() => {
    console.log("b detail ", isImgError);
    console.log(EntranceNum, building, EntranceNum[building]);
  }, [isImgError]);

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0">
      <div className="flex flex-col justify-start">
        <div className="relative w-full">
          {!isImgError ? (
            <Image
              src={
                isImgError
                  ? "/external/미디어관.jpg"
                  : `/external/${building}.jpg`
              }
              onError={() => setIsImgError(true)}
              alt="building"
              layout="responsive"
              width={1920} // 원본 이미지의 너비
              height={1080} // 원본 이미지의 높이
              objectFit="cover" // 이미지를 컨테이너에 맞게 조정
            />
          ) : (
            <div className="w-full h-[20vh] bg-gray-200" />
          )}
          <ChevronLeft
            className="absolute top-0 left-0 w-7 h-7 mr-4 mt-8 ml-3 cursor-pointer text-white font-bold z-10"
            onClick={() => {
              if (share) {
                router.push("/home");
              } else {
                router.back();
              }
            }}
          />
          <span className="absolute bottom-0 mb-4 ml-3 text-3xl font-semibold z-10 text-white">
            {building}
          </span>
        </div>
        <div className="flex flex-col ml-4 mt-4 justify-start">
          <div className="flex flex-row justify-start">
            <span className="text-gray-900 font-bold">평일</span>
            <span className="ml-2 text-textMain">
              {facData?.weekdayAvailable ?? "수집된 정보 없음"}
            </span>
          </div>
          <div className="flex flex-row justify-start">
            <span className="text-gray-900 font-bold">주말</span>
            <span className="ml-2 text-textMain">
              {facData?.weekendAvailable ?? "수집된 정보 없음"}
            </span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#DFE1E7] mt-3" />
        <div className="mt-3">
          <span className="ml-4">클릭하면 어디에 있는지 나와요</span>
          <div className="flex flex-row justify-evenly items-center mt-2">
            {facilityList.map((facility, index) => {
              return (
                <div
                  className="flex flex-col justify-center items-center cursor-pointer"
                  key={index}
                  onClick={() => {
                    router.push(
                      `/b?type=${facility.englishName}&building=${building}`
                    );
                  }}
                >
                  <div className="w-10 h-10 relative rounded-full overflow-hidden">
                    <Image
                      src={facility.image}
                      alt="building"
                      style={{ objectFit: "cover", aspectRatio: "1" }}
                      width={1920} // 원본 이미지의 너비
                      height={1080} // 원본 이미지의 높이
                      objectFit="cover" // 이미지를 컨테이너에 맞게 조정
                    />
                  </div>
                  <span className="text-textMain">{facility.koreanName}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#DFE1E7] mt-3" />
        <span className="mt-8  font-bold text-xl ml-4">입구 정보</span>
        {EntranceNum[building] ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full mt-4 self-center"
          >
            <CarouselContent>
              {Array.from({ length: EntranceNum[building] }, (_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center">
                        <div className="flex flex-col items-center justify-center relative w-full h-full">
                          <Image
                            src={`/entrance/${building}/${index + 1}.jpg`}
                            sizes="(max-width: 600px) 100vw"
                            fill
                            className="object-cover"
                            alt={`${building}${index}`}
                          />
                          <span className="absolute bottom-0 text-center w-full mb-2 font-bold text-xl text-textMain">
                            {building}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex flex-col justify-start items-center">
            <div className="relative w-full h-[35vh] mt-5">
              <Image
                src="/no-result-detail-image.png"
                sizes="(max-width: 600px) 100vw"
                fill
                className="object-contain"
                alt="Documents"
              />
            </div>
            <span className="font-bold">
              뻔선이 열심히 정보를 수집하고 있어요
            </span>
            <span className="font-bold">
              MY페이지에 가서 정보를 제보해 주세요!
            </span>
          </div>
        )}
        <span className="mt-8 font-bold text-xl ml-4">이용 특성</span>
        <div className="flex flex-col ml-4 mt-2">
          <span>{facData?.placeExplain ?? "수집된 정보가 없습니다."}</span>
        </div>
        <div className="w-full h-[1px] bg-white mt-20" />
      </div>
    </div>
  );
};

export default BuildingDetail;
