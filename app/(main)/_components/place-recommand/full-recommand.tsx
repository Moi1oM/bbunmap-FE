import { RecommandedPlace } from "../../(routes)/recommand/place/page";
import {
  ImageTitleDescription,
  koreanToEnglish,
} from "../image-title-description";
import RouterBar from "../router-bar";

interface FullRecommandProps {
  data: RecommandedPlace | undefined;
}

const FullRecommand = ({ data }: FullRecommandProps) => {
  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0 relative">
      <div className="flex flex-col justify-start  mt-8 mb-2 ml-3">
        <RouterBar share={false} fullRecommand={true} />
        <span className="font-medium text-xl bg-gray-100 py-1 rounded-md pl-3 flex justify-between items-center mt-8 mr-10">
          {data?.title}
        </span>
        <div className="flex flex-row justify-start items-center flex-wrap">
          {data?.places.map((fac) => {
            console.log("for place", fac);
            return (
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
            );
          })}
        </div>
        <div className="w-full h-20 bg-white" />
      </div>
    </div>
  );
};

export default FullRecommand;
