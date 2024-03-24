import { useTabBarStore } from "@/hooks/useTabBar";
import TabBarButton from "./tab-bar-button";
import { FlagIcon, FlameIcon, LightbulbIcon } from "lucide-react";
import HomeIcon from "@/public/icons/GNB/home.svg";
import HomeIconAbled from "@/public/icons/GNB/home_abled.svg";
import MyIcon from "@/public/icons/GNB/my.svg";
import MyIconAbled from "@/public/icons/GNB/my_abled.svg";
import OnAirIcon from "@/public/icons/GNB/onair.svg";
import OnAirIconAbled from "@/public/icons/GNB/onair_abled.svg";
import RecommIcon from "@/public/icons/GNB/recomm.svg";
import RecommIconAbled from "@/public/icons/GNB/recomm_abled.svg";

export default function TapBar() {
  return (
    <div className="flex flex-row justify-evenly items-center shadow-md z-20 fixed bottom-0 pb-6 w-full max-w-[450px] bg-white pt-1">
      <TabBarButton
        title="home"
        iconSelected={<HomeIconAbled className="h-6 w-6" />}
        iconNonSelected={<HomeIcon className="h-6 w-6" />}
        displayName="홈"
      />
      <TabBarButton
        title="onAir"
        iconSelected={<OnAirIconAbled className="h-6 w-6 " />}
        iconNonSelected={<OnAirIcon className="h-6 w-6 " />}
        displayName="실시간"
      />
      <TabBarButton
        title="recommend"
        iconSelected={<RecommIconAbled className="h-6 w-6" />}
        iconNonSelected={<RecommIcon className="h-6 w-6 " />}
        displayName="뻔맵추천"
      />
      <TabBarButton
        title="my"
        iconSelected={<MyIconAbled className="h-6 w-6 " />}
        iconNonSelected={<MyIcon className="h-6 w-6 " />}
        displayName="MY"
      />
    </div>
  );
}
