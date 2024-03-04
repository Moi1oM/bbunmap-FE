import Image from "next/image";
import { useRouter } from "next/navigation";

interface ImageTitleDescriptionProps {
  title: string;
  description: string;
  image: string;
  buildingName?: string;
  urlType?: string;
  facFloor?: string;
  route?: string;
}

export const ImageTitleDescription = ({
  title,
  description,
  image,
  buildingName,
  urlType,
  facFloor,
  route,
}: ImageTitleDescriptionProps) => {
  const router = useRouter();
  return (
    <div
      className="flex-col flex items-start justify-start max-w-[200px] overflow-hidden cursor-pointer mt-4 mr-3"
      onClick={() => {
        if (route) {
          router.push(route);
        } else {
          router.push(
            `f/detail?building=${buildingName}&facName=${title}&type=${koreanToEnglish(
              description
            )}&facFloor=${facFloor}`
          );
        }
      }}
    >
      <div className="relative w-[167px] h-[120px]">
        <Image
          src={image}
          sizes="(max-width: 600px) 100vw"
          fill
          className="object-contain"
          alt="Documents"
        />
      </div>
      <span className="text-xl font-bold overflow-hidden whitespace-nowrap text-overflow-ellipsis">
        {title}
      </span>
      <span className="text-base font-semibold text-[#A0A4A8]">
        {description}
      </span>
    </div>
  );
};

function koreanToEnglish(type: string) {
  switch (type) {
    case "카페":
      return "cafe";
    case "편의점":
      return "convenience";
    case "라운지":
      return "lounge";
    case "독서실":
      return "readingRoom";
    case "식당":
      return "restaurant";
    case "수면실":
      return "restRoom";
    case "문구점":
      return "stationery";
    case "그룹스터디룸":
      return "studyRoom";
    case "수면실":
      return "sleepingRoom";
    case "캐럴":
      return "carrel";
    default:
      return type; // 알 수 없는 type에 대해서는 그대로 반환
  }
}
