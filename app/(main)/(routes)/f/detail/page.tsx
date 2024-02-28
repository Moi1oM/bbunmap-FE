"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import ShareButton from "../../../_utils/onShareSns";
import RouterBar from "@/app/(main)/_components/router-bar";

const Detail = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const type = params.get("type");
  const building = params.get("building");
  const shareString: string | null = params.get("share");
  const share: boolean | null =
    shareString !== null ? shareString.toLowerCase() === "true" : null;
  const mainURL = process.env.NEXT_PUBLIC_MAIN_URL;

  const shareUrl = `${mainURL}${pathname}?type=${type}&building=${building}&share=true`;

  if (!type || !building) redirect("/home");

  const data = {
    buildingName: building,
    type: type,
    // 이 이로는 위의 두가지 정보를 가지고 서버에 요청을 보내서 데이터를 받아올 예정
    // 임시로 만든 데이터
    description: "알파라운지는 라운지 중에서도 가장 좋은 라운지입니다.",
    images: ["/sample1.jpg", "/sample2.jpg"],
    mood: "자는 분위기",
    talk: "상관없음",
    multitap: "거의 없음",
    reservation: "필요 없음",
  };

  return (
    <div className="w-full h-full max-w-[450px] select-none bg-white scrollbar-hide overflow-scroll top-0 left-0 mx-0 my-0 relative">
      <div className="flex flex-col justify-start  mt-8 mb-2 ml-3">
        <RouterBar share={share} />
        <span className="font-mono text-2xl mt-6 ml-3">
          {data.buildingName} {data.type}
        </span>
        <span className="font-mono text-sm mt-2 ml-3">{data.description}</span>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-3/5 mt-4 self-center"
        >
          <CarouselContent>
            {data.images.map((value, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center">
                      <div className="relative w-[360px] h-[260px]">
                        <Image
                          src={value}
                          sizes="(max-width: 600px) 100vw"
                          fill
                          className="object-contain"
                          alt="Documents"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex flex-row justify-start ml-6 mt-6">
          <div className="flex flex-col justify-start items-start">
            <span className="text-sm text-[#74787D]">분위기</span>
            <span className="text-sm text-[#74787D]">대화</span>
            <span className="text-sm text-[#74787D]">멀티탭</span>
            <span className="text-sm text-[#74787D]">예약</span>
          </div>
          <div className="flex flex-col justify-start items-start ml-4">
            <span className="text-sm text-[#333333]">{data.mood}</span>
            <span className="text-sm text-[#333333]">{data.talk}</span>
            <span className="text-sm text-[#333333]">{data.multitap}</span>
            <span className="text-sm text-[#333333]">{data.reservation}</span>
          </div>
        </div>
        <div className="bg-white mt-5" />
        <ShareButton title={`${building} ${type}`} url={shareUrl} />
      </div>
    </div>
  );
};

export default Detail;
