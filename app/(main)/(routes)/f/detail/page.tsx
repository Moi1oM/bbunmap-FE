"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import ShareButton from "../../../_utils/onShareSns";
import RouterBar from "@/app/(main)/_components/router-bar";
import { Facility } from "@/app/_const/facility";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import FacilityDetailContent from "@/app/(main)/_components/facilitiy-detail/facility-detail-content";
import { Button } from "@/components/ui/button";
import Share from "@/public/icons/share.svg";
import { toast } from "sonner";
import { useSearchKeywordConvi } from "@/hooks/useSearchKeywordConvi";

const fetchBuildingFacility = async (
  buildingName: string,
  type: string,
  facName: string
) => {
  const newType = type === "carrel" ? "studyRoom" : type;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/f/${newType}?buildingName=${buildingName}&facilityName=${facName}`
  );
  return response.json();
};

export interface ResponseFacilityDetail {
  buildingName?: string;
  buildingNum?: string;
  type?: string;
  //라운지용
  loungeName?: string;
  //그룹스터디룸용
  reservation?: string;
  reservationSite?: string;
  studentIdCardTagging?: string;
  studyRoomName?: string;
  //카페용
  cafeName?: string;
  weekDayAvailableTime?: string;
  weekendAvailableTime?: string;
  //
  keyword?: string;
  mood?: string;
  conversation?: string;
  socket?: string;
  feature?: string;
  picFile?: string;
  placeExplain?: string;
  floorFacilityImage?: string;
}

const Detail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const type: string = params.get("type") || "";
  const facName: string = params.get("facName") || "";
  const facFloor: string = params.get("facFloor") || "";
  const facility: Facility = type as Facility;
  const building = params.get("building");
  const shareString: string | null = params.get("share");
  const fromRecommand = params.get("fromRecommand") === "true";
  const share: boolean | null =
    shareString !== null ? shareString.toLowerCase() === "true" : null;
  const mainURL = process.env.NEXT_PUBLIC_MAIN_URL;

  const shareUrl = `${mainURL}${pathname}?type=${type}&facName=${facName}&facFloor=${facFloor}&building=${building}&share=true`;

  if (!type || !building) redirect("/home");

  const {
    isPending: facilityIsPending,
    error: facilityError,
    data: facilityData,
  } = useQuery<ResponseFacilityDetail>({
    queryKey: ["facilityDetailInfo", building, facName],
    queryFn: () => {
      const promise = fetchBuildingFacility(building, type, facName);
      toast.promise(promise, {
        loading: "건물 시설 정보를 불러오는 중입니다...",
        success: "건물 시설 정보 로딩 성공!",
        error: "건물 시설 정보 로딩에 실패했습니다.",
      });
      return promise;
    },
  });

  let images = facilityData?.picFile?.split(",").map((value) => value.trim());

  useEffect(() => {
    console.log("images... ", images);
    console.log("fetch Data... ", facilityData);
    console.log("building", building, "type", type, "facName", facName);
  }, [facilityData, images]);

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0 relative">
      <div className="flex flex-col justify-start  mt-8 mb-2 ml-3">
        <RouterBar share={share} fromRecommand={fromRecommand} />
        <span className="font-mono text-2xl mt-6 ml-3">
          {building} {facName}
        </span>
        <span className="font-mono text-sm mt-2 ml-3">
          {facilityData?.placeExplain}
        </span>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-3/5 mt-4 self-center"
        >
          <CarouselContent>
            {images?.map((value, index) => {
              console.log(`/fac-img/${building}/${facFloor}/${value}.jpg`);
              return (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center">
                        <div className="relative w-[360px] h-[260px]">
                          <Image
                            src={`/fac-img/${building}/${facFloor}/${value}.jpg`}
                            sizes="(max-width: 600px) 100vw"
                            fill
                            className="object-contain"
                            alt="Documents"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {images && images.length > 2 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
        <FacilityDetailContent facilityData={facilityData!} />

        <div className="bg-white mt-5" />
        {!fromRecommand ||
          (facilityError && (
            <ShareButton
              title={`${building} ${type}`}
              url={shareUrl}
              size="lg"
            />
          ))}
        {fromRecommand && !facilityError && (
          <div className="absolute bottom-20 w-full px-3 flex flex-row items-center justify-center ">
            {/* 여기에 absolute와 bottom-20을 추가합니다. */}
            <ShareButton title="" url={shareUrl} size={"sm"} />
            <Button
              className="bg-[#FFF0F3] w-full mx-3"
              onClick={() => {
                router.push(
                  `/b?type=${type}&building=${building}&onlyFloor=${true}`
                );
              }}
            >
              <span className="text-main">위치 보기</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
