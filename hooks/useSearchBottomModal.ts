import { create } from "zustand";

type SearchBottomStore = {
  isSearchBottomModalOpen: boolean;
  bottomModalSearchBuilding: string;
  setBottomModalSearchBuilding: (building: string) => void;
  toggleSearchBottomModal: () => void;
  setSearchBottomModalClose: () => void;
  setSearchBottomModalOpen: () => void;
};

export const useSearchBottomModal = create<SearchBottomStore>((set) => ({
  isSearchBottomModalOpen: false,
  bottomModalSearchBuilding: "",
  setBottomModalSearchBuilding: (building: string) =>
    set({ bottomModalSearchBuilding: building }),
  setSearchBottomModalClose: () => set({ isSearchBottomModalOpen: false }),
  toggleSearchBottomModal: () =>
    set((state) => ({
      isSearchBottomModalOpen: !state.isSearchBottomModalOpen,
    })),
  setSearchBottomModalOpen: () => set({ isSearchBottomModalOpen: true }),
}));
