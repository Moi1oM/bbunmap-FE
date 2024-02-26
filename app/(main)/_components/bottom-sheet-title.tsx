import { useSpaceBarStore } from "@/hooks/useRecommandButton";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface BottomSheetTitleProps {
  children: ReactNode;
  route: string;
  settingRecommand?: boolean;
}

const BottomSheetTitle: React.FC<BottomSheetTitleProps> = ({
  children,
  route,
  settingRecommand = false,
}) => {
  const { currentSpace, setSpace } = useSpaceBarStore();

  const router = useRouter();

  return (
    <div className="flex flex-row justify-between items-center pb-3">
      <span className="text-xl">{children}</span>
      <div
        className="flex flex-row items-center justify-end hover:cursor-pointer text-slate-400"
        onClick={() => {
          if (settingRecommand) {
            setSpace("place");
          }
          router.push(route);
        }}
      >
        <span>더보기</span>
        <ChevronRight className="h-4 w-4 text-slate-400 " />
      </div>
    </div>
  );
};

export default BottomSheetTitle;
