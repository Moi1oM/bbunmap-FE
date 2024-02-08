import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";

interface ShareData {
  title: string;
  text?: string;
  url: string;
}

const ShareButton: React.FC<ShareData> = ({ title, url }: ShareData) => {
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

  return (
    <Button className="self-center w-4/5" onClick={onShareToSns}>
      공유하기
    </Button>
  );
};

export default ShareButton;
