import { create } from "zustand";

type SearchStore = {
  isSearchModalOpen: boolean;
  toggleSearchModal: () => void;
  setSearchModalClose: () => void;
  setSearchModalOpen: () => void;
};

export const useSearchModal = create<SearchStore>((set) => ({
  isSearchModalOpen: false,
  setSearchModalClose: () => set({ isSearchModalOpen: false }),
  setSearchModalOpen: () => set({ isSearchModalOpen: true }),
  toggleSearchModal: () =>
    set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen })),
}));
