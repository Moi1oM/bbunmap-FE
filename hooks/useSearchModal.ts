import { create } from "zustand";

type SearchStore = {
  isSearchModalOpen: boolean;
  toggleSearchModal: () => void;
  setSearchModalClose: () => void;
};

export const useSearchModal = create<SearchStore>((set) => ({
  isSearchModalOpen: false,
  setSearchModalClose: () => set({ isSearchModalOpen: false }),
  toggleSearchModal: () =>
    set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen })),
}));
