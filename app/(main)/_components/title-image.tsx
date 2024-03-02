import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface TitleImageType {
  title: string;
  imageSrc: string;
}

interface TitleImageProps {
  titleImage: TitleImageType[];
  titleBackground?: boolean;
}

const TitleImage = ({
  titleImage,
  titleBackground = false,
}: TitleImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "flex flex-col justify-start items-start",
        !titleBackground ? "mx-6 mt-6" : "mt-4"
      )}
    >
      {titleImage.map((value, index) => (
        <div key={index} className="mt-3">
          <span
            className={cn(
              "font-bold",
              titleBackground && "w-full text-xl bg-gray-100 pl-3"
            )}
          >
            {value.title}
          </span>
          {!imageLoaded && <Skeleton className="w-[350px] h-[40vh]" />}
          <div className="relative w-full mt-3">
            <Image
              src={value.imageSrc}
              alt="floorMapImage"
              layout="responsive"
              width={1920} // 원본 이미지의 너비
              height={1080} // 원본 이미지의 높이
              objectFit="cover"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TitleImage;
