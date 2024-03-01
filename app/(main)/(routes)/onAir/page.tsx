"use client";

import { Button } from "@/components/ui/button";
import { useTabBarStore } from "@/hooks/useTabBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface respondType {
  id: number;
  num: number;
}

const postCount = async (): Promise<any> => {
  const response = await fetch(
    "https://port-0-bbunmap-be-5mk12alp3wgrdi.sel5.cloudtype.app/count",
    {
      method: "POST",
    }
  );
  return response.json();
};

const OnAir = () => {
  const { setTab } = useTabBarStore();
  const [count, setCount] = useState<number>(0);
  const { isPending, error, data } = useQuery<respondType>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://port-0-bbunmap-be-5mk12alp3wgrdi.sel5.cloudtype.app/count")
        .then((res) => {
          return res.json();
        })
        .then((numb: respondType) => {
          setCount(numb.num);
          return numb;
        }),
  });

  const fetchCount = async (): Promise<respondType> => {
    const response = await fetch(
      "https://port-0-bbunmap-be-5mk12alp3wgrdi.sel5.cloudtype.app/count"
    );
    const resmb = await response.json();
    setCount(resmb.num);
    return resmb;
  };

  const addMutation = useMutation({
    mutationFn: () =>
      fetch(
        "https://port-0-bbunmap-be-5mk12alp3wgrdi.sel5.cloudtype.app/count",
        {
          method: "POST",
        }
      ),
    onSuccess: () => {
      fetchCount();
      toast.success("투표가 성공적으로 완료되었습니다");
    },
  });

  useEffect(() => {
    setTab("onAir");
  }, [setTab]);

  const handleOnclick = () => {
    const cookie = Cookies.get("xNT3p2KK8J");
    if (!cookie) {
      addMutation.mutate();
      Cookies.set("xNT3p2KK8J", "true", { expires: 1 }); // 쿠키 설정. 필요에 따라 값을 변경하세요.
    } else {
      toast.info("이미 투표를 완료했습니다");
    }
  };

  useEffect(() => {
    console.log("air", data);
  }, [data]);

  return (
    <div className="w-full max-w-[450px] h-full left-0 top-0">
      <div className="flex flex-col justify-start items-center">
        <div className="relative w-full h-[75vh]">
          <Image
            src="/vote-image.png"
            sizes="(max-width: 600px) 100vw"
            fill
            className="object-contain"
            alt="Documents"
          />
        </div>
        <Button className="bg-main" onClick={handleOnclick}>
          출시 알림 받기
        </Button>
        <span className="mt-2 font-semibold">
          현재 알림 신청한 수 :{" "}
          {isPending ? <Skeleton className="w-4 h-4 rounded-md" /> : count}
        </span>
      </div>
    </div>
  );
};

export default OnAir;
