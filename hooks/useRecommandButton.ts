import { create } from "zustand";

export type Space = "move" | "place";

type SpaceStore = {
  currentSpace: Space;
  setSpace: (space: Space) => void;
};

export const useSpaceBarStore = create<SpaceStore>((set) => ({
  currentSpace: "move",
  setSpace: (space: Space) => set({ currentSpace: space }),
}));
