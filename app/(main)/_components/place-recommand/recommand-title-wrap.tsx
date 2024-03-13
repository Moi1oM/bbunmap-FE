import { title } from "process";
import { RecommandedPlace } from "../../(routes)/recommand/place/page";
import {
  ImageTitleDescription,
  koreanToEnglish,
} from "../image-title-description";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { usePlaceRecommand } from "@/hooks/usePlaceRecommand";

interface RecommandTitleWrapProps {
  data: RecommandedPlace[] | undefined;
}

const RecommandTitleWrap = ({ data }: RecommandTitleWrapProps) => {
  const { isFullRecommand, setFullRecommandOpen, setKeyword } =
    usePlaceRecommand();

  useEffect(() => {
    console.log("rec Fetch data...", data);
  }, []);

  return (
    <>
      {data?.map((value, index) => (
        <div className="flex flex-col justify-start mt-8 ml-4" key={index}>
          <span className="font-medium text-xl bg-gray-100 py-1 rounded-md pl-3 flex justify-between items-center">
            {value.title}
            <ChevronRight
              className="cursor-pointer"
              onClick={() => {
                setFullRecommandOpen();
                setKeyword(value.title);
              }}
            />
          </span>
          <div className="flex flex-row justify-start items-center flex-wrap">
            {value.places.length > 2
              ? [...value.places]
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 2)
                  .map((fac) => (
                    <ImageTitleDescription
                      key={
                        fac.buildingName +
                        fac.description +
                        fac.placeName +
                        fac.placeType
                      }
                      title={fac.placeName}
                      description={fac.description}
                      buildingName={fac.buildingName}
                      image={fac.picFile ?? "/sample2.jpg"}
                      route={`/f/detail?building=${fac.buildingName}&facName=${
                        fac.placeName
                      }&type=${koreanToEnglish(fac.placeType)}&facFloor=${
                        fac.floor ?? "1"
                      }&fromRecommand=${true}`}
                    />
                  ))
              : value.places.map((fac) => (
                  <ImageTitleDescription
                    key={
                      fac.buildingName +
                      fac.description +
                      fac.placeName +
                      fac.placeType
                    }
                    title={fac.placeName}
                    description={fac.description}
                    buildingName={fac.buildingName}
                    image={fac.picFile ?? "/sample2.jpg"}
                    route={`/f/detail?building=${fac.buildingName}&facName=${
                      fac.placeName
                    }&type=${koreanToEnglish(fac.placeType)}&facFloor=${
                      fac.floor ?? "1"
                    }&fromRecommand=${true}`}
                  />
                ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default RecommandTitleWrap;
