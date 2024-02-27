import { cn } from "@/lib/utils";
import Image from "next/image";

interface TitleImageProps {
  title: string;
  imageSrc: string;
  titleBackground?: boolean;
}

const TitleImage = ({
  title,
  imageSrc,
  titleBackground = false,
}: TitleImageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-start items-start",
        !titleBackground ? "mx-6 mt-6" : "mt-4"
      )}
    >
      <span
        className={cn(
          "font-medium",
          titleBackground && "w-full text-xl bg-gray-100 pl-3"
        )}
      >
        {title}
      </span>
      <div className="relative w-full mt-3">
        <Image
          src={imageSrc}
          alt="route Image"
          layout="responsive"
          width={1920} // 원본 이미지의 너비
          height={1080} // 원본 이미지의 높이
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default TitleImage;
