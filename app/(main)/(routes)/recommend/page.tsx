"use client";

import { useEffect, useState } from "react";
import SelectedButton from "../../_components/recommand-button/selected";
import { useTabBarStore } from "@/hooks/useTabBar";
import TitleImage from "../../_components/title-image";
import { useRouter } from "next/navigation";

type RecommandAnchor = "move" | "place";

const Recommand = () => {
  const router = useRouter();
  const { setTab } = useTabBarStore();

  useEffect(() => {
    setTab("recommend");
  }, []);

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
  };

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0">
      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-row justify-start items-center mt-6">
          <SelectedButton title="이동 꿀팁" selected={true} className="ml-6" />

          <SelectedButton
            title="공간 추천"
            selected={false}
            className="ml-6"
            onclick={() => {
              router.push("/recommend/place");
            }}
          />
        </div>
        <TitleImage titleImage={data.route} />
      </div>
    </div>
  );
};

export default Recommand;
