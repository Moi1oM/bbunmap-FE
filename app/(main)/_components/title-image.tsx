"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TitleImageType {
  title: string;
  imageSrc: string;
  routerLink?: string;
}

interface TitleImageProps {
  titleImage: TitleImageType[];
  titleBackground?: boolean;
}

const TitleImage = ({
  titleImage,
  titleBackground = false,
}: TitleImageProps) => {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imgAlt, setImgAlt] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "flex flex-col justify-start items-start",
        !titleBackground ? "mx-6 mt-6" : "mt-4"
      )}
    >
      {titleImage.map((value, index) => (
        <div key={index} className="mt-3 flex flex-col justify-start">
          <span
            className={cn(
              "font-bold flex justify-between items-center",
              titleBackground && "w-full text-xl bg-gray-100 pl-3"
            )}
          >
            {value.title}

            {/* value.routerLink가 있을 경우, ChevronRight 아이콘을 보여줍니다 */}
            {value.routerLink && (
              <ChevronRight
                className="cursor-pointer"
                onClick={() => {
                  const buildings = [
                    "과학도서관",
                    "백주년기념관",
                    "미디어관",
                    "중앙광장지하",
                    "하나스퀘어",
                  ];

                  // buildings 배열의 길이 범위 안에서 랜덤한 정수를 생성합니다.
                  const randomIndex = Math.floor(
                    Math.random() * buildings.length
                  );

                  // 생성된 랜덤 인덱스를 이용해 building을 선택합니다.
                  const building = buildings[randomIndex];

                  router.push(
                    `/b?type=${value.routerLink}&building=${building}`
                  );
                }}
              />
            )}
          </span>

          {/* imgAlt가 false이고 imageLoaded가 false일 때만 Skeleton을 보여줍니다 */}
          {!imgAlt && !imageLoaded && (
            <Skeleton className="w-[350px] h-[40vh]" />
          )}

          {/* imgAlt가 false일 때만 이미지를 보여줍니다 */}
          {!imgAlt && (
            <div className="relative w-full mt-3">
              <Image
                src={value.imageSrc}
                alt="floorMapImage"
                layout="responsive"
                width={1920} // 원본 이미지의 너비
                height={1080} // 원본 이미지의 높이
                objectFit="cover"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImgAlt(true)}
              />
            </div>
          )}
        </div>
      ))}
      <div className="w-full h-[1px] bg-white mt-20" />
    </div>
  );
};

export default TitleImage;
