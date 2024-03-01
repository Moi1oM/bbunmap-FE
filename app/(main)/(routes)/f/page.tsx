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

const Facility = () => {
  const params = useSearchParams();
  const type = params.get("type");

  const {
    setSearchBottomModalOpen,
    isSearchBottomModalOpen,
    bottomModalSearchBuilding,
  } = useSearchBottomModal();

  const fakeType = "라운지";

  const facilityInfos: BuildingFacilityInfo[] = [
    {
      lat: 37.5845688,
      lon: 127.0265505,
      name: "과학도서관",
      facilityNumber: 3,
    },
    {
      lat: 37.58669797,
      lon: 127.03110737,
      name: "미디어관",
      facilityNumber: 2,
    },
    { lat: 37.58948623, lon: 127.03228041, name: "본관", facilityNumber: 0 },
  ];

  return (
    <div className="w-full max-w-[450px] h-full left-0 top-0">
      <TopSearchResult searchKeyword={fakeType} />
      <KakaoMap
        markers={facilityInfos}
        center={{ lat: 37.58706787265499, lon: 127.02916578491909 }}
        markerModalEvent={true}
      />
      {isSearchBottomModalOpen && (
        <SearchBottomModal
          searchType={type!}
          searchContext={true}
          searchText={fakeType}
        />
      )}
    </div>
  );
};

export default Facility;
