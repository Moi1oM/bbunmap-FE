// hooks/useBottomSheet.ts
import { create } from "zustand";

type BottomSheetStore = {
  isBottomSheetVisible: boolean;
  toggleBottomSheet: () => void;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
};

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  isBottomSheetVisible: true,
  toggleBottomSheet: () =>
    set((state) => ({ isBottomSheetVisible: !state.isBottomSheetVisible })),
  openBottomSheet: () => set((state) => ({ isBottomSheetVisible: true })),
  closeBottomSheet: () => set((state) => ({ isBottomSheetVisible: false })),
}));
