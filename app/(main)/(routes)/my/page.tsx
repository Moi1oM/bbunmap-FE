"use client";

import { CircleUserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import MyCurious from "@/public/icons/my_curious.svg";
import { useRouter } from "next/navigation";
import { useTabBarStore } from "@/hooks/useTabBar";
import { useEffect } from "react";
import { ProfileButton } from "../../_components/profile-button";

const Reward = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setTab } = useTabBarStore();

  useEffect(() => {
    setTab("my");
  }, [setTab]);

  return (
    <div className="w-full max-w-[450px] h-full left-0 top-0">
      <div className="flex flex-col justify-start items-center">
        {session ? (
          <div
            className="mt-20 cursor-pointer flex flex-col justify-start items-center"
            onClick={() => signOut()}
          >
            <ProfileButton size="lg" />
            <span className="mt-3 mb-3 font-semibold">
              {session?.user?.email}
            </span>
          </div>
        ) : (
          <div
            className="mt-20 flex flex-col justify-start items-center"
            onClick={() => signIn("kakao")}
          >
            <CircleUserIcon className="w-20 h-20" />
            <div className="w-3/4 relative mt-6 cursor-pointer mb-5">
              <Image
                src="/kakao_login_medium_wide (1).png"
                alt="kakao login"
                layout="responsive"
                width={1800} // 원본 이미지의 너비
                height={270} // 원본 이미지의 높이
                objectFit="cover" // 이미지를 컨테이너에 맞게 조정
              />
            </div>
          </div>
        )}
        <div className="bg-gray-200 w-full h-[1px]" />
        <div
          className="flex flex-row justify-start mt-3 mb-3 w-full ml-5 cursor-pointer"
          onClick={() =>
            router.push(
              "https://www.notion.so/FUN-07e34afb8ae844cd9323b49b913b6971?pvs=4"
            )
          }
        >
          <span>뻔맵이 뭐예요?</span>
        </div>
        <div className="bg-gray-200 w-full h-[1px]" />
        <div
          className="flex flex-row justify-start mt-3 mb-3 w-full ml-5 cursor-pointer"
          onClick={() =>
            router.push(
              "https://nebulasw.notion.site/PWA-1136841d652b4c95a6e5414aa1828418"
            )
          }
        >
          <span>뻔맵 앱 다운로드 방법</span>
        </div>
        <div className="bg-gray-200 w-full h-[1px]" />
        <div
          className="flex flex-row justify-start mt-3 mb-3 w-full ml-5 cursor-pointer"
          onClick={() => router.push("https://www.instagram.com/bbun.map/")}
        >
          <span>뻔맵 인스타그램</span>
        </div>
        <div className="bg-gray-200 w-full h-[1px]" />
        <div
          className="flex flex-row justify-start mt-3 mb-3 w-full ml-5 cursor-pointer"
          onClick={() =>
            router.push("https://1lzqaowxugu.typeform.com/to/FGD29dHH")
          }
        >
          <span>뻔맵에게 정보 제보하기</span>
        </div>
        <div className="bg-gray-200 w-full h-[1px] " />
        <div
          className="flex flex-row justify-between mt-3 mb-3 w-full cursor-pointer"
          onClick={() =>
            router.push("https://1lzqaowxugu.typeform.com/to/KzXjlk8L")
          }
        >
          <span className="ml-3">뻔맵에게 피드백 주기</span>
          <MyCurious />
        </div>
        {session && (
          <span
            className="text-gray-200 bottom-20 fixed cursor-pointer"
            onClick={() => signOut()}
          >
            로그아웃
          </span>
        )}
      </div>
    </div>
  );
};

export default Reward;
