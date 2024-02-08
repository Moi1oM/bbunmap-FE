import Image from "next/image";
import { useRouter } from "next/navigation";

export const Heroes = () => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center justify-start max-w-[450px] pt-2 pb-2 cursor-pointer"
      onClick={() => router.refresh()}
    >
      <div className="flex items-center">
        <div className="relative w-[30px] h-[30px]">
          <Image
            src="/pin.png"
            fill
            className="object-contain dark:hidden"
            alt="Documents"
          />
        </div>
        {/* <div className="relative h-[40px] w-[40px]">
          <Image
            src="/title.png"
            fill
            className="object-contain dark:hidden"
            alt="Reading"
          />
        </div> */}
      </div>
    </div>
  );
};
