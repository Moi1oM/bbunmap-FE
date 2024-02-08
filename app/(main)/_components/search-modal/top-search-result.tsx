import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopSearchResultProps {
  searchKeyword: string;
}

const TopSearchResult = ({ searchKeyword }: TopSearchResultProps) => {
  const router = useRouter();

  return (
    <div className="w-full z-20 fixed top-0 min-h-12 max-w-[450px] select-none bg-white">
      <div className="flex flex-col justify-end mt-8 mb-2 ml-3">
        <div className="flex flex-row justify-start items-center">
          <ChevronLeft
            className="w-7 h-7 mr-4 cursor-pointer text-[#A0A4A8]"
            onClick={() => router.back()}
          />
          <span className="font-mono">{searchKeyword}</span>
        </div>
      </div>
    </div>
  );
};

export default TopSearchResult;
