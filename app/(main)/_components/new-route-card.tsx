interface NewRouteCardProps {
  fromBuildingName: string;
  toBuildingName: string;
}

export default function NewRouteCard({
  fromBuildingName,
  toBuildingName,
}: NewRouteCardProps) {
  return (
    <div className="bg-[#F7F8F9] flex flex-col justify-around rounded-xl p-4">
      <h1 className="text-[#474C51] text-lg font-semibold">
        {fromBuildingName}
      </h1>
      <h1 className="text-[#474C51] text-lg font-semibold">{toBuildingName}</h1>
    </div>
  );
}
