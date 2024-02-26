import { cn } from "@/lib/utils";
import { MouseEvent } from "react"; // 수정된 import

interface SelectedButtonProps {
  title: string;
  selected: boolean;
  className?: string;
  onclick?: (event: MouseEvent<HTMLDivElement>) => void;
}

// SelectedButton 컴포넌트
const SelectedButton = ({
  title,
  selected,
  className,
  onclick = () => {}, // default function in case onclick is not provided
}: SelectedButtonProps) => {
  return (
    <div
      className={cn("flex flex-col cursor-pointer", className)}
      onClick={onclick} // directly call the function passed
    >
      <span
        className={cn(
          "font-bold text-lg",
          selected ? "text-black" : "text-gray-500"
        )}
      >
        {title}
      </span>
      {selected && <div className="h-[3px] w-full bg-black px-1" />}
    </div>
  );
};

export default SelectedButton;
