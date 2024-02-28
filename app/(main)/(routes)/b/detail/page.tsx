"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface BuildingDetailProps {}

const BuildingDetail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const building = params.get("building");
  const shareString: string | null = params.get("share");
  const share: boolean | null =
    shareString !== null ? shareString.toLowerCase() === "true" : null;

  const facilityList = [
    {
      englishName: "lounge",
      koreanName: "라운지",
      image: "/facility/MBlounge.png",
    },
    {
      koreanName: "정수기",
      englishName: "waterPurifier",
      image: "/facility/waterPurifier.png",
    },
    {
      koreanName: "1인실",
      englishName: "singleRoom",
      image: "/facility/singleRoom.png",
    },
    {
      koreanName: "스터디룸",
      englishName: "studyRoom",
      image: "/facility/studyRoom.png",
    },
    {
      koreanName: "카페",
      englishName: "cafe",
      image: "/facility/cafe.png",
    },
  ];
  const data = {
    buildingName: building,
    // 이 아래 빌딩 이름을 기반으로 데이터를 가져와야 합니다.
    callNumber: "02-3290-0000",
    time: {
      weekdays: {
        open: "09:00",
        close: "22:00",
      },
      weekends: {
        open: "09:00",
        close: "22:00",
      },
    },
    entrances: [
      {
        name: "정문",
        image: "/sample1.jpg",
      },
      {
        name: "후문",
        image: "/sample2.jpg",
      },
    ],
    properties: [
      "2020년에 지어져 시설이 깨끗하다.",
      "1층에는 전시, 부스 등을 진행하는 공간이 있고 강당이 있다.",
      "취업박람회 등 외부 행사가 열리는 장소다.",
    ],
  };

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0">
      <div className="flex flex-col justify-start">
        <div className="relative w-full">
          <Image
            src="/sample1.jpg"
            alt="building"
            layout="responsive"
            width={1920} // 원본 이미지의 너비
            height={1080} // 원본 이미지의 높이
            objectFit="cover" // 이미지를 컨테이너에 맞게 조정
          />
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
          <span className="absolute bottom-0 mb-4 ml-3 text-white text-3xl font-semibold z-10">
            {data.buildingName}
          </span>
        </div>
        <div className="flex flex-col ml-4 mt-4 justify-start">
          <div className="flex flex-row justify-start">
            <span className="text-gray-900 font-bold">평일</span>
            <span className="ml-2 text-textMain">{`${data.time.weekdays.open} ~ ${data.time.weekdays.close}`}</span>
          </div>
          <div className="flex flex-row justify-start">
            <span className="text-gray-900 font-bold">주말</span>
            <span className="ml-2 text-textMain">{`${data.time.weekends.open} ~ ${data.time.weekends.close}`}</span>
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
                      `/f/detail?type=${facility.englishName}&building=${building}`
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
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-2/3 mt-4 self-center"
        >
          <CarouselContent>
            {data.entrances.map((value, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center">
                      <div className="relative w-[360px] h-[260px]">
                        <Image
                          src={value.image}
                          sizes="(max-width: 600px) 100vw"
                          fill
                          className="object-contain"
                          alt="Documents"
                        />
                        <div className="absolute inset-0 flex items-end justify-center">
                          <span className="w-full text-center">
                            {value.name}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <span className="mt-8 font-bold text-xl ml-4">이용 특성</span>
        <div className="flex flex-col ml-4 mt-2">
          {data.properties.map((value, index) => (
            <span key={index} className="text-textMain">
              {value}
            </span>
          ))}
        </div>
        <div className="w-full h-[1px] bg-white mt-20" />
      </div>
    </div>
  );
};

export default BuildingDetail;
