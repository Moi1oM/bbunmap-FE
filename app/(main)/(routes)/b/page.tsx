"use client";

import { FloorFactilities } from "@/app/(main)/_components/floor-factilities";
import TopToggleMenu from "@/app/(main)/_components/list-floor-top-bar";
import RouterBar from "@/app/(main)/_components/router-bar";
import TitleImage from "@/app/(main)/_components/title-image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export type Facility = {
  type: string;
  name: string;
  image_src: string;
};

type TopMenu = "list" | "floormap";

const Building = () => {
  const router = useRouter();
  const params = useSearchParams();
  const buildingName: string | null = params.get("building");
  const [selectedMenu, setSelectedMenu] = useState<TopMenu>("list");

  const data = {
    buildingName: buildingName!,
    facilities: [
      {
        floor: 1,
        facilities: [
          {
            type: "라운지",
            name: "알파라운지",
            image_src: "/sample1.jpg",
          },
        ],
      },
      {
        floor: 2,
        facilities: [
          {
            type: "라운지",
            name: "알파라운지",
            image_src: "/sample2.jpg",
          },
          {
            type: "라운지",
            name: "베타라운지",
            image_src: "/sample2.jpg",
          },
        ],
      },
      {
        floor: 3,
        facilities: [
          {
            type: "라운지",
            name: "알파라운지",
            image_src: "/sample1.jpg",
          },
          {
            type: "라운지",
            name: "베타라운지",
            image_src: "/sample1.jpg",
          },
          {
            type: "라운지",
            name: "감마라운지",
            image_src: "/sample1.jpg",
          },
        ],
      },
    ],
    floormap: [
      {
        floor: 1,
        image: "/floor/floorSample.png",
      },
      {
        floor: 2,
        image: "/floor/floorSample.png",
      },
      {
        floor: 3,
        image: "/floor/floorSample.png",
      },
    ],
  };

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
          data.facilities.map((fac) => {
            return (
              <FloorFactilities
                buildingName={data.buildingName}
                floor={fac.floor}
                facilities={fac.facilities}
                key={fac.floor}
              />
            );
          })}
        {selectedMenu === "floormap" &&
          data.floormap.map((value, index) => {
            return (
              <TitleImage
                key={index}
                title={`${value.floor}층`}
                imageSrc={value.image}
                titleBackground={true}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Building;
