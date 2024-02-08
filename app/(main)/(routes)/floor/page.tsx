"use client";

import { useSearchParams } from "next/navigation";
import RouterBar from "../../_components/router-bar";
import FloorImage from "../../_components/floor-image";

const Floor = () => {
  const params = useSearchParams();
  const type = params.get("type");
  const building = params.get("building");
  const shareString: string | null = params.get("share");
  const share: boolean | null =
    shareString !== null ? shareString.toLowerCase() === "true" : null;

  const data = {
    buildingName: building,
    // 이 밑의 데이터들은 직접 가져와야함.
    floorImages: [
      {
        floorNumber: 1,
        floorFacilityImage: "/floor/floorSample.png",
      },
      {
        floorNumber: 2,
        floorFacilityImage: "/floor/floorSample.png",
      },
      {
        floorNumber: 3,
        floorFacilityImage: "/floor/floorSample.png",
      },
    ],
  };

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0">
      <div className="flex flex-col justify-start  mt-8 mb-2 ml-3">
        <RouterBar share={share} />
        {data.floorImages.map((value, index) => {
          return (
            <FloorImage
              key={index}
              title={`${value.floorNumber}층`}
              imageSrc={value.floorFacilityImage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Floor;
