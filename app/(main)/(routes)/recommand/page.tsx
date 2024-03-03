"use client";

import { useEffect, useState } from "react";
import SelectedButton from "../../_components/recommand-button/selected";
import { useTabBarStore } from "@/hooks/useTabBar";
import { useSpaceBarStore } from "@/hooks/useRecommandButton";
import TitleImage from "../../_components/title-image";

type RecommandAnchor = "move" | "place";

const Recommand = () => {
  const { setTab } = useTabBarStore();
  const { currentSpace, setSpace } = useSpaceBarStore();

  useEffect(() => {
    setTab("recommand");
  }, [setTab]);

  const data = {
    route: [
      {
        title: "이캠 실내 루트",
        imageSrc: "/route/route1.png",
      },
      {
        title: "문캠 실내 루트",
        imageSrc: "/route/route2.png",
      },
    ],
    place: [
      {
        title: "조용히 공부하고 싶을 때",
        imageSrc: "/fac-img/백주년기념관/1/[main]백주년기념관_F1_C-Lounge.jpg",
        routerLink: "lounge",
      },
      {
        title: "빠르게 커피 사고 싶을 때",
        imageSrc: "/fac-img/과학도서관/B1/[main]과도_커피스퀘어.jpg",
        routerLink: "cafe",
      },
      {
        title: "애기능 생활관 학식",
        imageSrc: "/recommand/애기능생활관_학식.png",
      },
    ],
  };

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0">
      <div className="flex flex-row justify-start items-center mt-6">
        <SelectedButton
          title="이동 꿀팁"
          selected={currentSpace === "move"}
          className="ml-6"
          onclick={() => setSpace("move")}
        />

        <SelectedButton
          title="공간 추천"
          selected={currentSpace === "place"}
          className="ml-6"
          onclick={() => {
            setSpace("place");
          }}
        />
      </div>
      {currentSpace === "move" && <TitleImage titleImage={data.route} />}
      {currentSpace === "place" && <TitleImage titleImage={data.place} />}
    </div>
  );
};

export default Recommand;
