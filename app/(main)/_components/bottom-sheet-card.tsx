import Link from "next/link";
import ProgressBar from "./progress-bar";

interface BottomSheetCardProps {
  buildingName: string;
  seats: number;
  buildingMaxCapacity: number;
  showText?: boolean; // 추가된 prop
}

export default function BottomSheetCard({
  buildingName,
  seats,
  buildingMaxCapacity,
  showText = false, // 기본값은 false
}: BottomSheetCardProps) {
  return (
    <Link href={"https://www.instagram.com/bbun.map/"}>
      <div className="relative">
        {" "}
        {showText ? ( // 조건부 렌더링
          <div className="absolute z-10 w-full h-full flex items-center justify-center bg-white bg-opacity-70 backdrop-blur">
            <span className="text-xl font-semibold">
              {buildingName} 남은 자리가 궁금하다면?
            </span>
          </div>
        ) : null}
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
      </div>
    </Link>
  );
}
