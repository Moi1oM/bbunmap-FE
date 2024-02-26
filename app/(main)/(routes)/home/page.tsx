"use client";

import KakaoMap, { BuildingInfo } from "@/app/_components/kakao-map";
import dynamic from "next/dynamic";

import Image from "next/image";
import BottomSheetCard from "../../_components/bottom-sheet-card";
import TopAppBar from "../../_components/top-app-bar";
import BottomSheetTitle from "../../_components/bottom-sheet-title";
import { useSearchModal } from "@/hooks/useSearchModal";
import { useSession } from "next-auth/react";
import { SearchModal } from "../../_components/search-modal/search-modal";
import { useEffect } from "react";
import { useTabBarStore } from "@/hooks/useTabBar";

const BottomSheetWithDynamicImport = dynamic(
  () => import("../../_components/bottom-sheet/BottomSheet"),
  { loading: () => <div>Loading...</div>, ssr: false }
);

export default function Home() {
  console.log("뻔맵을 찾아주셔서 감사합니다! 🥰");
  console.log("뻔맵은 아직 개발중이에요! 🤔");
  console.log("뻔맵은 더 좋은 서비스를 위해 노력하고 있어요! 🤩");
  console.log("뻔맵은 여러분의 의견을 기다리고 있어요! 🤗");
  console.log("데이터를 찾아보려는 시도는 하지 말아주세요! 🙏");

  const { isSearchModalOpen, setSearchModalClose } = useSearchModal();
  const { data: session } = useSession();
  const { setTab } = useTabBarStore();

  const latLng: BuildingInfo[] = [
    { lat: 37.5845688, lng: 127.0265505, name: "과학도서관" },
    { lat: 37.58669797, lng: 127.03110737, name: "미디어관" },
  ];
  const center = { lat: 37.58379268032499, lng: 127.02954409489267 };

  const onAirData = {
    buildingName: "미래관 B1",
    seats: 10,
    buildingMaxCapacity: 20,
  };

  useEffect(() => {
    setTab("home");
    setSearchModalClose();
  }, [setSearchModalClose, setTab]);

  const routeData = {
    fromBulidingName: "미래관",
    toBuildingName: "하나스퀘어",
  };

  return (
    <div className="w-full max-w-[450px] h-full left-0 top-0">
      <KakaoMap markers={latLng} center={center} bulidingInfoEvent={true} />
      <TopAppBar />
      <BottomSheetWithDynamicImport>
        <BottomSheetTitle route="/b">
          <div>
            {!session && (
              <span>
                <strong>실시간</strong> 인기 공간 정보
              </span>
            )}
            {session && (
              <span>
                {session?.user?.name}을 위한 <strong>실시간</strong> 내 주변
                공간 정보
              </span>
            )}
          </div>
        </BottomSheetTitle>
        <BottomSheetCard
          buildingName={onAirData.buildingName}
          buildingMaxCapacity={onAirData.buildingMaxCapacity}
          seats={onAirData.seats}
          showText={true}
        />
        <BottomSheetTitle route="/recommand">
          <div>
            뉴 업뎃 <strong>이동꿀팁</strong>
          </div>
        </BottomSheetTitle>
        <div className="relative w-full mb-4">
          <Image
            src={"/sample1.jpg"}
            alt="route Image"
            layout="responsive"
            width={1920} // 원본 이미지의 너비
            height={1080} // 원본 이미지의 높이
            objectFit="cover"
          />
        </div>
        {/* <NewRouteCard
          fromBuildingName={routeData.fromBulidingName}
          toBuildingName={routeData.toBuildingName}
        /> */}
        <BottomSheetTitle route="/recommand" settingRecommand={true}>
          <div className="font-semibold">지금 갈만한 곳은</div>
        </BottomSheetTitle>
      </BottomSheetWithDynamicImport>
      {isSearchModalOpen && <SearchModal />}
    </div>
  );
}
