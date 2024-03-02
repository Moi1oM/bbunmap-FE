"use client";

import KakaoMap, {
  BuildingFacilityInfo,
  LatLng,
} from "@/app/_components/kakao-map";
import { useSearchParams } from "next/navigation";
import TopSearchResult from "../../_components/search-modal/top-search-result";
import { useSearchBottomModal } from "@/hooks/useSearchBottomModal";
import SearchBottomModal from "../../_components/search-bottom-modal/search-bottom-modal";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

type BuildingNum = {
  buildingName: string;
  longitude: number;
  latitude: number;
  num: number;
};

type BuildingType = {
  buildingName: string;
  type: string;
  longitude: number;
  latitude: number;
};

type ResponseData = BuildingNum | BuildingType;

const fetchBuildingNums = async (facName: string, entity: boolean) => {
  const url = entity
    ? `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/facility/${facName}`
    : `${process.env.NEXT_PUBLIC_API_SERVER_MAIN_URL}/facilityLoc?type=${facName}`;
  const response = await fetch(url);
  return response.json();
};

const Facility = () => {
  const params = useSearchParams();
  const type = params.get("type") || "lounge";
  const entity = params.get("entity") === "true";

  const {
    isPending: facilityIsPending,
    error: facilityError,
    data: facilityData,
  } = useQuery<ResponseData[]>({
    queryKey: ["facilityNumList", type],
    queryFn: () => fetchBuildingNums(type, entity),
  });

  const {
    setSearchBottomModalOpen,
    isSearchBottomModalOpen,
    bottomModalSearchBuilding,
  } = useSearchBottomModal();

  const facilityInfos: BuildingFacilityInfo[] | undefined = facilityData?.map(
    (item) => ({
      lat: item.latitude,
      lon: item.longitude,
      name: item.buildingName,
    })
  );

  return (
    <div className="w-full max-w-[450px] h-full left-0 top-0">
      <TopSearchResult searchKeyword={type} />
      <KakaoMap
        markers={facilityInfos}
        center={{ lat: 37.58706787265499, lon: 127.02916578491909 }}
        markerModalEvent={true}
      />
      {isSearchBottomModalOpen && (
        <SearchBottomModal
          searchType={type!}
          searchContext={true}
          searchText={type}
        />
      )}
    </div>
  );
};

export default Facility;
