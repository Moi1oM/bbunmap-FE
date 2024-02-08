import React from "react";

interface ProgressBarProps {
  curSeats: number;
  maxSeats: number;
}

function ProgressBar({ curSeats, maxSeats }: ProgressBarProps) {
  const percentage = (curSeats / maxSeats) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className="h-full text-center text-white bg-main rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
