"use client";

import SelectedButton from "@/app/(main)/_components/recommand-button/selected";
import RecommandTitleWrap from "@/app/(main)/_components/place-recommand/recommand-title-wrap";
import { Skeleton } from "@/components/ui/skeleton";
import { useTabBarStore } from "@/hooks/useTabBar";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullRecommand from "@/app/(main)/_components/place-recommand/full-recommand";
import { usePlaceRecommand } from "@/hooks/usePlaceRecommand";

interface PlaceProps {
  placeName: string;
  placeType: string;
  description: string;
  buildingName: string;
  picFile?: string;
  floor?: string;
}

export interface RecommandedPlace {
  title: string;
  places: PlaceProps[];
}

interface PlaceRecommandProps {}

const fetchRecommandPlaces = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/recommend`
  );
  return response.json();
};

const PlaceRecommand = ({}: PlaceRecommandProps) => {
  const router = useRouter();
  const { isFullRecommand, setFullRecommandClose, refreshKeyword, keyword } =
    usePlaceRecommand();

  const { setTab } = useTabBarStore();

  const {
    isPending,
    error: facilityError,
    data: facilityData,
  } = useQuery<RecommandedPlace[]>({
    queryKey: ["recommandList"],
    queryFn: () => fetchRecommandPlaces(),
  });

  useEffect(() => {
    setTab("recommand");
    console.log("fetched data...", facilityData);
  }, []);

  if (isPending) return <RecSkeleton />;

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0">
      {!isFullRecommand && (
        <div className="flex flex-col justify-start items-start">
          <div className="flex flex-row justify-start items-center mt-6">
            <SelectedButton
              title="이동 꿀팁"
              selected={false}
              className="ml-6"
              onclick={() => router.push("/recommend")}
            />
            <SelectedButton
              title="공간 추천"
              selected={true}
              className="ml-6"
            />
          </div>
          <RecommandTitleWrap data={facilityData} />
          <div className="w-full my-20" />
        </div>
      )}
      {isFullRecommand && (
        <FullRecommand
          data={facilityData?.find((facility) => facility.title === keyword)}
        />
      )}
    </div>
  );
};

export default PlaceRecommand;

const RecSkeleton = () => {
  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-auto my-0">
      <Skeleton className="flex flex-col justify-end mt-8 mb-2 ml-3">
        <Skeleton className="h-6 bg-gray-300 rounded animate-pulse"></Skeleton>
        <Skeleton className="flex flex-row justify-evenly items-center mt-4">
          <Skeleton className="w-24 h-6 bg-gray-300 rounded animate-pulse"></Skeleton>
          <Skeleton className="w-24 h-6 bg-gray-300 rounded animate-pulse"></Skeleton>
        </Skeleton>
        <Skeleton className="mt-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-24 bg-gray-300 rounded mt-4 animate-pulse"
            ></Skeleton>
          ))}
        </Skeleton>
      </Skeleton>
    </div>
  );
};
