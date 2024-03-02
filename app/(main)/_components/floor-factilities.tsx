import { BuildingInfo, Facility } from "../(routes)/b/page";
import { ImageTitleDescription } from "./image-title-description";

interface FloorFacilitiesProps {
  floor: number | string;
  facilities: Facility[];
  buildingName: string;
  buildInfo?: BuildingInfo;
}

export const FloorFactilities = ({
  floor,
  facilities,
  buildingName,
  buildInfo,
}: FloorFacilitiesProps) => {
  return (
    <div className="flex flex-col justify-start mt-4">
      <span className="font-medium text-xl bg-gray-100 pl-3">{floor}층</span>
      <div className="flex flex-row justify-start items-center flex-wrap">
        {facilities.map((fac) => {
          return (
            <ImageTitleDescription
              key={fac.name}
              title={fac.name}
              description={fac.type}
              buildingName={buildingName}
              image={fac.image_src}
            />
          );
        })}
      </div>
    </div>
  );
};
