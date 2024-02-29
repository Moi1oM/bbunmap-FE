"use client";

import { useBottomSheetStore } from "@/hooks/useBottomSheetAppearance";
import { useSearchBottomModal } from "@/hooks/useSearchBottomModal";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Cookies from "js-cookie";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

export interface LatLng {
  lat: number;
  lng: number;
}

export interface BuildingInfo extends LatLng {
  name?: string;
}

export interface BuildingFacilityInfo extends BuildingInfo {
  facilityNumber?: number;
}

interface KakaoMapProps {
  markers: BuildingFacilityInfo[];
  markersImage?: string;
  center: LatLng;
  markerModalEvent?: boolean;
  bulidingInfoEvent?: boolean;
  bottomSheetEvent?: boolean;
  markerCurious?: boolean;
}

const KakaoMap = ({
  markers,
  center,
  markerModalEvent,
  bulidingInfoEvent,
  bottomSheetEvent,
  markerCurious,
}: KakaoMapProps) => {
  const router = useRouter();
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: center.lat, lng: center.lng },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: true,
    level: 4,
  });
  const {
    setSearchBottomModalOpen,
    setBottomModalSearchBuilding,
    isSearchBottomModalOpen,
    setSearchBottomModalClose,
    bottomModalSearchBuilding,
  } = useSearchBottomModal();
  const { isBottomSheetVisible, toggleBottomSheet } = useBottomSheetStore(); // Zustand store 사용

  const [markerImage, setMarkerImage] = useState<string>("/icons/tooltip.svg");
  const [markerWH, setMarkerWH] = useState({ width: 130, height: 74 });

  useEffect(() => {
    const isFirstVisit = !Cookies.get("visited");
    const delay = isFirstVisit ? 5000 : 2000;
    console.log("first? ", isFirstVisit);

    const timer = setTimeout(() => {
      setMarkerImage("/pin-copy.png");
      setMarkerWH({ width: 25, height: 35 });
    }, delay);

    Cookies.set("visited", "true", { expires: 1 / 24 });

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: "100%", height: "100%" }}
        level={state.level}
      >
        {markers.map((item, index) => (
          <MapMarker
            key={index}
            image={{
              src: !markerCurious ? "/pin-copy.png" : markerImage,
              // typeof item.facilityNumber !== "undefined"
              //   ? item.facilityNumber >= 0 && item.facilityNumber <= 5
              //     ? `./result-pin/result-pin-${item.facilityNumber}.png`
              //     : `./result-pin/result-pin-5+.png`
              //   : `./black-pin.png`,
              size: !markerCurious ? { width: 25, height: 35 } : markerWH,
            }}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => {
              setState({
                center: { lat: item.lat, lng: item.lng },
                level: 4,
                isPanto: true,
              });
              if (markerModalEvent) {
                if (
                  isSearchBottomModalOpen &&
                  item.name === bottomModalSearchBuilding
                ) {
                  setSearchBottomModalClose();
                  setBottomModalSearchBuilding("");
                } else {
                  setSearchBottomModalOpen();
                  setBottomModalSearchBuilding(item.name!);
                }
              }
              if (bulidingInfoEvent) {
                // router.push(`/b/detail?building=${item.name}`);
              }
              if (bottomSheetEvent) {
                setBottomModalSearchBuilding(item.name!);
                toggleBottomSheet();
              }
            }}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
