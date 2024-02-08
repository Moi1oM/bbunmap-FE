"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FloorFactilities } from "../../_components/floor-factilities";
import RouterBar from "../../_components/router-bar";

export type Facility = {
  type: string;
  name: string;
  image_src: string;
};

const Building = () => {
  const router = useRouter();
  const params = useSearchParams();
  const buildingName: string | null = params.get("building");

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
  };

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-auto my-0">
      <div className="flex flex-col justify-end mt-8 mb-2 ml-3">
        <RouterBar />
        {data.facilities.map((fac) => {
          return (
            <FloorFactilities
              buildingName={data.buildingName}
              floor={fac.floor}
              facilities={fac.facilities}
              key={fac.floor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Building;
