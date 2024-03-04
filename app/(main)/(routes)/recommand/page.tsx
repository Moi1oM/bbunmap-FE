"use client";

import { useEffect, useState } from "react";
import SelectedButton from "../../_components/recommand-button/selected";
import { useTabBarStore } from "@/hooks/useTabBar";
import { useSpaceBarStore } from "@/hooks/useRecommandButton";
import TitleImage from "../../_components/title-image";
import { ImageTitleDescription } from "../../_components/image-title-description";
import { cn } from "@/lib/utils";
import RecommandTitleDescription from "../../_components/recommand-title-desc";

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
        facs: [
          {
            title: "지하 1층 라운지",
            description: "SK미래관",
            imageSrc:
              "/fac-img/SK미래관/B1/[main]SK미래관_B1_지하 1층 라운지.JPG",
          },
          {
            title: "Lounge G",
            description: "하나스퀘어",
            imageSrc: "/fac-img/하나스퀘어/B1/[main] 하스_Lounge-G.jpg",
          },
        ],
      },
      {
        title: "빠르게 커피 사고 싶을 때",
        facs: [
          {
            title: "지하 1층 라운지",
            description: "SK미래관",
            imageSrc:
              "/fac-img/SK미래관/B1/[main]SK미래관_B1_지하 1층 라운지.JPG",
          },
          {
            title: "Lounge G",
            description: "하나스퀘어",
            imageSrc: "/fac-img/하나스퀘어/B1/[main] 하스_Lounge-G.jpg",
          },
        ],
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
      {currentSpace === "place" && (
        <>
          <RecommandTitleDescription />
          <div className="bg-white h-20" />
        </>
      )}
    </div>
  );
};

export default Recommand;
