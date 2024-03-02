import Image from "next/image";
import { useRouter } from "next/navigation";

interface ImageTitleDescriptionProps {
  title: string;
  description: string;
  image: string;
  buildingName: string;
  urlType: string;
  facFloor: string;
}

export const ImageTitleDescription = ({
  title,
  description,
  image,
  buildingName,
  urlType,
  facFloor,
}: ImageTitleDescriptionProps) => {
  const router = useRouter();
  return (
    <div
      className="flex-col flex items-start justify-start max-w-[200px] overflow-hidden cursor-pointer mt-4 mr-3"
      onClick={() => {
        router.push(
          `f/detail?building=${buildingName}&facName=${title}&type=${urlType}&facFloor=${facFloor}`
        );
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
