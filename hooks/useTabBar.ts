import { create } from "zustand";

export type Tab = "home" | "reward" | "onAir" | "recommand";

type TabStore = {
  currentTab: Tab;
  setTab: (tab: Tab) => void;
};

export const useTabBarStore = create<TabStore>((set) => ({
  currentTab: "home",
  setTab: (tab: Tab) => set({ currentTab: tab }),
}));
