import { Input } from "@/components/ui/input";
import { useSearchModal } from "@/hooks/useSearchModal";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopSearchResultProps {
  searchKeyword: string;
}

const TopSearchResult = ({ searchKeyword }: TopSearchResultProps) => {
  const router = useRouter();
  const { setSearchModalOpen } = useSearchModal();

  return (
    <div className="w-full z-20 fixed top-0 min-h-12 max-w-[450px] select-none bg-white">
      <div className="flex flex-col mt-6 mb-[10px]">
        <div className="flex flex-row justify-start items-center">
          <ChevronLeft
            className="w-7 h-7 mr-4 cursor-pointer text-[#A0A4A8]"
            onClick={() => {
              router.back();
              setSearchModalOpen();
            }}
          />
          <span className="font-mono">{searchKeyword}</span>
        </div>
        {/* <div className="flex flex-row justify-between items-center">
          <ChevronLeft
            className="w-7 h-7 mr-2 ml-3 cursor-pointer"
            onClick={() => router.back()}
          />
          <Input
            type="text"
            value={searchKeyword}
            readOnly={true}
            className="mr-4"
          />
        </div> */}
      </div>
    </div>
  );
};

export default TopSearchResult;
