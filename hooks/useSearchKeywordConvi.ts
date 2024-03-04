import { create } from "zustand";

type SearchKeywordConvi = {
  isSearchKeywordConvi: boolean;
  setSearchKeywordConviTrue: () => void;
  setSearchKeywordConviFalse: () => void;
};

export const useSearchKeywordConvi = create<SearchKeywordConvi>((set) => ({
  isSearchKeywordConvi: false,
  setSearchKeywordConviTrue: () => set({ isSearchKeywordConvi: true }),
  setSearchKeywordConviFalse: () => set({ isSearchKeywordConvi: false }),
}));
