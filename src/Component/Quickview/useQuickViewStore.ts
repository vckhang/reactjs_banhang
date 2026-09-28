import { create } from 'zustand';
import type { Product } from '../../Page/Home/Api';


interface QuickViewState {
  isOpen: boolean;
  selectedProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  isOpen: false,
  selectedProduct: null,
  openQuickView: (product) => set({ isOpen: true, selectedProduct: product }),
  closeQuickView: () => set({ isOpen: false }),
}));