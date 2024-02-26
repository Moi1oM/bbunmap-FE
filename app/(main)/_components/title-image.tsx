import Image from "next/image";

interface TitleImageProps {
  title: string;
  imageSrc: string;
}

const TitleImage = ({ title, imageSrc }: TitleImageProps) => {
  return (
    <div className="flex flex-col justify-start items-start mt-6 mx-6">
      <span className="font-medium">{title}</span>
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
