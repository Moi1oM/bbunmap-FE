import { useTabBarStore } from "@/hooks/useTabBar";
import TabBarButton from "./tab-bar-button";
import { FlagIcon, FlameIcon, HomeIcon, LightbulbIcon } from "lucide-react";

export default function TapBar() {
  return (
    <div className="flex flex-row justify-evenly items-center shadow-md z-20 fixed bottom-0 w-full max-w-[450px] bg-white pt-1">
      <TabBarButton
        title="home"
        iconSelected={<HomeIcon className="h-6 w-6 text-black" />}
        iconNonSelected={<HomeIcon className="h-6 w-6 text-gray-400" />}
      />
      <TabBarButton
        title="reward"
        iconSelected={<FlagIcon className="h-6 w-6 text-black" />}
        iconNonSelected={<FlagIcon className="h-6 w-6 text-gray-400" />}
      />
      <TabBarButton
        title="onAir"
        iconSelected={<FlameIcon className="h-6 w-6 text-black" />}
        iconNonSelected={<FlameIcon className="h-6 w-6 text-gray-400" />}
      />
      <TabBarButton
        title="recommand"
        iconSelected={<LightbulbIcon className="h-6 w-6 text-black" />}
        iconNonSelected={<LightbulbIcon className="h-6 w-6 text-gray-400" />}
      />
    </div>
  );
}
