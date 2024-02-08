import Image from "next/image";

interface FloorImageProps {
  title: string;
  imageSrc: string;
}

const FloorImage = ({ title, imageSrc }: FloorImageProps) => {
  return (
    <div className="relative w-full mt-6">
      <Image
        src={imageSrc}
        alt="floor Image"
        layout="responsive"
        width={1920} // 원본 이미지의 너비
        height={1080} // 원본 이미지의 높이
        objectFit="cover"
      />
      <div className="absolute top-0 left-0 bg-white">
        <span className="font-bold text-lg">{title}</span>
      </div>
    </div>
  );
};

export default FloorImage;
