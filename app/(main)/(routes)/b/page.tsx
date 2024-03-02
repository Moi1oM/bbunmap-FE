"use client";

import { FloorFactilities } from "@/app/(main)/_components/floor-factilities";
import TopToggleMenu from "@/app/(main)/_components/list-floor-top-bar";
import RouterBar from "@/app/(main)/_components/router-bar";
import TitleImage from "@/app/(main)/_components/title-image";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type Facility = {
  type: string;
  name: string;
  image_src: string;
};

interface FacResponse {
  id: number;
  buildingName: string;
  type: string;
  //
  loungeName?: string;
  readingRoomName?: string;
  studyRoomName?: string;
  cafeName?: string;
  restaurantName?: string;
  convenienceStoreName?: string;
  restRoomName?: string;
  stationeryStoreName?: string;
  //
  keyword: string;
  mood: string;
  conversation: string;
  socket: string;
  feature: string;
  picFile: string;
  placeExplain: string;
}

export interface BuildingInfo {
  buildingName: string;
  floor: string;
  [key: string]: any;
  lounge: FacResponse[];
  readingRoom: FacResponse[];
  studyRoom: FacResponse[];
  cafe: FacResponse[];
  restaurant: FacResponse[];
  convenienceStore: FacResponse[];
  restRoom: FacResponse[];
  stationeryStoreName: FacResponse[];
}

type TopMenu = "list" | "floormap";

const fetchBuildingFacilities = async (buildingName: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/facilities?buildingName=${buildingName}`
  );
  return response.json();
};

const Building = () => {
  const router = useRouter();
  const params = useSearchParams();
  const buildingName: string = params.get("building") || "default";
  const urlType: string = params.get("type") || "";
  const [selectedMenu, setSelectedMenu] = useState<TopMenu>("list");

  const {
    isPending: facilityIsPending,
    error: facilityError,
    data: facilityData,
  } = useQuery<BuildingInfo[]>({
    queryKey: ["facilityList", buildingName],
    queryFn: () => fetchBuildingFacilities(buildingName),
  });

  useEffect(() => {
    console.log("abbps", facilityData);
  }, [facilityData]);

  const facilitiesTypes = [
    "lounge",
    "readingRoom",
    "studyRoom",
    "cafe",
    "restaurant",
    "convenienceStore",
    "restRoom",
    "stationeryStoreName",
  ];

  if (facilityIsPending) return <FacSkeleton />;

  const groupedFacilities = facilityData?.reduce(
    (acc: any, buildingInfo: BuildingInfo) => {
      if (!acc[buildingInfo.floor]) {
        acc[buildingInfo.floor] = {
          buildingName: buildingInfo.buildingName,
          floor: buildingInfo.floor,
          facilities: [],
          floorMap: {
            floor: buildingInfo.floor,
            image: `/floorMap/${buildingInfo.buildingName}/${buildingInfo.floor}/${urlType}.png`,
          },
        };
      }
      facilitiesTypes.forEach((type) => {
        buildingInfo[type].forEach((fac: FacResponse) => {
          if (urlType === "" || fac.type === englishToKorean(urlType)) {
            // fac.type이 type과 동일한 경우에만 추가
            acc[buildingInfo.floor].facilities.push({
              type: fac.type,
              name: getFacilityName(type, fac),
              image_src: `/fac-img/${fac.buildingName}/${
                buildingInfo.floor
              }/${fac.picFile.split(",")[0].trim()}.jpg`,
            });
          }
        });
      });
      console.log("abps", acc);
      return acc;
    },
    {}
  );

  const facilitiesByFloor = groupedFacilities
    ? Object.values(groupedFacilities)
    : [];

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-auto my-0">
      <div className="flex flex-col justify-end mt-8 mb-2 ml-3">
        <RouterBar />
        <div className="flex flex-row justify-evenly items-center">
          <TopToggleMenu
            title={"리스트"}
            selected={selectedMenu === "list"}
            onClick={() => setSelectedMenu("list")}
          />
          <TopToggleMenu
            title={"플로어맵"}
            selected={selectedMenu === "floormap"}
            onClick={() => setSelectedMenu("floormap")}
          />
        </div>
        {selectedMenu === "list" &&
          facilitiesByFloor.map((buildingInfo: any, index: number) => {
            return (
              <FloorFactilities
                buildingName={buildingInfo.buildingName}
                floor={buildingInfo.floor}
                facilities={buildingInfo.facilities}
                key={`${buildingInfo.floor} ${buildingName}`}
              />
            );
          })}
        {selectedMenu === "floormap" &&
          facilitiesByFloor.map((value: any, index) => {
            console.log(index, value);
            return (
              <TitleImage
                key={index}
                titleImage={[
                  {
                    title: `${value.floorMap.floor}층`,
                    imageSrc: value.floorMap.image,
                  },
                ]}
                titleBackground={true}
              />
            );
          })}
      </div>
    </div>
  );
};

const FacSkeleton = () => {
  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-auto my-0">
      <div className="flex flex-col justify-end mt-8 mb-2 ml-3">
        <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex flex-row justify-evenly items-center mt-4">
          <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="mt-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-24 bg-gray-300 rounded mt-4 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getFacilityName = (type: string, fac: FacResponse) => {
  switch (type) {
    case "lounge":
      return fac.loungeName;
    case "readingRoom":
      return fac.readingRoomName;
    case "studyRoom":
      return fac.studyRoomName;
    case "cafe":
      return fac.cafeName;
    case "restaurant":
      return fac.restaurantName;
    case "convenienceStore":
      return fac.convenienceStoreName;
    case "restRoom":
      return fac.restRoomName;
    case "stationeryStoreName":
      return fac.stationeryStoreName;
    default:
      return "";
  }
};

export default Building;

function englishToKorean(type: string) {
  switch (type) {
    case "cafe":
      return "카페";
    case "convenience":
      return "편의점";
    case "lounge":
      return "라운지";
    case "readingRoom":
      return "독서실";
    case "restaurant":
      return "식당";
    case "restRoom":
      return "화장실";
    case "stationery":
      return "문구점";
    case "studyRoom":
      return "스터디룸";
    case "sleepingRoom":
      return "수면실";
    default:
      return type; // 알 수 없는 type에 대해서는 그대로 반환
  }
}
