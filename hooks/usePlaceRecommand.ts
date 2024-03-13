import { create } from "zustand";

type PlaceRecommand = {
  isFullRecommand: boolean;
  keyword: string;
  toggleFullRecommand: () => void;
  setFullRecommandClose: () => void;
  setFullRecommandOpen: () => void;
  setKeyword: (type: string) => void;
  refreshKeyword: () => void;
};

export const usePlaceRecommand = create<PlaceRecommand>((set) => ({
  isFullRecommand: false,
  keyword: "",
  setKeyword: (type: string) => set({ keyword: type }),
  refreshKeyword: () => set({ keyword: "" }),
  setFullRecommandClose: () => set({ isFullRecommand: false }),
  setFullRecommandOpen: () => set({ isFullRecommand: true }),
  toggleFullRecommand: () =>
    set((state) => ({ isFullRecommand: !state.isFullRecommand })),
}));
