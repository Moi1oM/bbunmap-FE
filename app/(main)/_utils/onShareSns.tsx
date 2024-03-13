import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import Share from "@/public/icons/share.svg";

interface ShareData {
  title: string;
  text?: string;
  url: string;
  size?: "lg" | "sm"; // size prop 추가
}

const ShareButton: React.FC<ShareData> = ({
  title,
  url,
  size = "lg",
}: ShareData) => {
  console.log("title: ", title);
  console.log("url: ", url);
  const onShareToSns = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .catch(console.error);
    } else {
      // 대체 화면 띄우기
      console.log("Web Share API is not supported in this browser");
    }
  }, [title, url]);

  const renderContent = () => {
    if (size === "sm") {
      return (
        <Button className="w-1/5 bg-gray-100" onClick={onShareToSns}>
          <Share />
        </Button>
      );
    } else {
      return (
        <Button
          className="self-center w-4/5 bg-gray-100 flex flex-row items-center justify-center bottom-20 absolute"
          onClick={onShareToSns}
        >
          <Share />
          <span className="text-black ml-6">공유하기</span>
        </Button>
      );
    }
  };

  return renderContent();
};

export default ShareButton;
