import ProgressBar from "./progress-bar";

interface BottomSheetCardProps {
  buildingName: string;
  seats: number;
  buildingMaxCapacity: number;
}

export default function BottomSheetCard({
  buildingName,
  seats,
  buildingMaxCapacity,
}: BottomSheetCardProps) {
  return (
    <div className="bg-[#F7F8F9] flex flex-col justify-around rounded-xl p-4 mb-8">
      <h1 className="text-[#474C51] text-lg font-semibold">
        {buildingName} 남은 자리
      </h1>
      <div className="flex flex-row justify-between">
        <span>많다</span>
        <span>적다</span>
      </div>
      <ProgressBar curSeats={seats} maxSeats={buildingMaxCapacity} />
    </div>
  );
}
