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

const fetchBuildingFacility = async (
  buildingName: string,
  type: string,
  facName: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/f/${type}?buildingName=${buildingName}&facilityName=${facName}`
  );
  return response.json();
};

interface ResponseFacilityDetail {
  buildingName?: string;
  buildingNum?: string;
  type?: string;
  loungeName?: string;
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
  const params = useSearchParams();
  const pathname = usePathname();
  const type: string = params.get("type") || "";
  const facName: string = params.get("facName") || "";
  const facFloor: string = params.get("facFloor") || "";
  const facility: Facility = type as Facility;
  const building = params.get("building");
  const shareString: string | null = params.get("share");
  const share: boolean | null =
    shareString !== null ? shareString.toLowerCase() === "true" : null;
  const mainURL = process.env.NEXT_PUBLIC_MAIN_URL;

  const shareUrl = `${mainURL}${pathname}?type=${type}&building=${building}&share=true`;

  if (!type || !building) redirect("/home");

  const {
    isPending: facilityIsPending,
    error: facilityError,
    data: facilityData,
  } = useQuery<ResponseFacilityDetail>({
    queryKey: ["facilityDetailInfo", building, facName],
    queryFn: () => fetchBuildingFacility(building, type, facName),
  });

  let images = facilityData?.picFile?.split(",").map((value) => value.trim());

  useEffect(() => {
    console.log("abps", images);
  }, [images]);

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0 relative">
      <div className="flex flex-col justify-start  mt-8 mb-2 ml-3">
        <RouterBar share={share} />
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
        <div className="flex flex-row justify-start ml-6 mt-6">
          <div className="flex flex-col justify-start items-start flex-shrink-0">
            <span className="text-sm text-[#74787D]">분위기</span>
            <span className="text-sm text-[#74787D]">대화</span>
            <span className="text-sm text-[#74787D]">멀티탭</span>
            <span className="text-sm text-[#74787D]">특징</span>
          </div>
          <div className="flex flex-col justify-start items-start ml-4 flex-shrink-0">
            <span className="text-sm text-[#333333]">
              {facilityData?.mood ?? "수집된 정보 없음."}
            </span>
            <span className="text-sm text-[#333333]">
              {facilityData?.conversation ?? "수집된 정보 없음."}
            </span>
            <span className="text-sm text-[#333333]">
              {facilityData?.socket ?? "수집된 정보 없음."}
            </span>
            <span className="text-sm text-[#333333] whitespace-normal max-w-[280px]">
              {facilityData?.feature ?? "수집된 정보 없음."}
            </span>
          </div>
        </div>

        <div className="bg-white mt-5" />
        <ShareButton title={`${building} ${type}`} url={shareUrl} />
      </div>
    </div>
  );
};

export default Detail;
