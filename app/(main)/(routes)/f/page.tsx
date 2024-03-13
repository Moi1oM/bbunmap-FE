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
import { useRouter } from "next/navigation";
import { useSearchKeywordConvi } from "@/hooks/useSearchKeywordConvi";
import { toast } from "sonner";

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
  console.log(url);
  const response = await fetch(url);
  return response.json();
};

const Facility = () => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") || "lounge";
  const entity = params.get("entity") === "true";
  const isConvi = params.get("convi") === "true";
  const isConviFromSearchModal = params.get("isConvi") === "true";
  const { setSearchKeywordConviTrue, isSearchKeywordConvi } =
    useSearchKeywordConvi();
  const {
    setSearchBottomModalOpen,
    isSearchBottomModalOpen,
    bottomModalSearchBuilding,
    setSearchBottomModalClose,
  } = useSearchBottomModal();

  const {
    isPending: facilityIsPending,
    error: facilityError,
    data: facilityData,
  } = useQuery<ResponseData[]>({
    queryKey: ["facilityNumList", type],
    queryFn: () => {
      const promise = fetchBuildingNums(type, entity);
      toast.promise(promise, {
        loading: "데이터를 불러오는 중입니다...",
        success: "데이터 로딩 성공!",
        error: "데이터 로딩에 실패했습니다.",
      });
      return promise;
    },
  });
  useEffect(() => {
    // isConviFromSearchModal이 true일 경우 setSearchKeywordConviTrue 실행
    if (isConviFromSearchModal) {
      setSearchKeywordConviTrue();
    }
    setSearchBottomModalClose();
    console.log(facilityData);
    // 기타 로그 출력
    console.log("isConvi", isConvi);
    console.log("isSearchKeywordConvi", isSearchKeywordConvi);
    console.log("isConviFromSearchModal", isConviFromSearchModal);
  }, [isConvi, isConviFromSearchModal, isSearchKeywordConvi]);
  if (facilityData && facilityData?.length === 1) {
    router.push(`/b?type=${type}&building=${facilityData[0].buildingName}`);
  }

  const facilityInfos: BuildingFacilityInfo[] | undefined = Array.isArray(
    facilityData
  )
    ? facilityData.map((item) => ({
        lat: item.latitude,
        lon: item.longitude,
        name: item.buildingName,
      }))
    : undefined;

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
