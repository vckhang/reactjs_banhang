import { create } from 'zustand';
import { getCategoryDetail, type FilterOption, type Product, type FilterParams } from '../ArchiveProductAPI';

export interface FilterState {
  
  // Filter values
  categoryId: string;
  priceRange: { min: number; max: number };
  selectedPriceFrom: number;
  selectedPriceTo: number;
  selectedColors: any[];
  selectedSizes: any[];
  selectedStyle?: string;
  selectedSort: string;
  
  // UI state
  currentPage: number;
  limit: number;
  isFilterOpen: boolean;
  expandedSections: {
    style: boolean;
    price: boolean;
    color: boolean;
    size: boolean;
    sizeChart: boolean;
  };
  
  // Data
  products: Product[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;
  
  // Available filter options
  availableColors: FilterOption[];
  availableSizes: FilterOption[];
  
  // Actions
  setCategoryId: (id: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setSelectedPrice: (from: number, to: number) => void;
  toggleColor: (color: number) => void;
  toggleSize: (size: number) => void;
  setStyle: (style: string) => void;
  setSort: (sort: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  toggleFilterOpen: () => void;
  closeFilter: () => void;
  toggleSection: (section: keyof FilterState['expandedSections']) => void;
  clearAllFilters: () => void;
  fetchProducts: () => Promise<void>;

  reset: () => void;
  initCategoryPage: (id: string) => void;
}

const initialExpandedSections = {
  style: true,
  price: true,
  color: true,
  size: true,
  sizeChart: true,
};

export const useProductFilterStore = create<FilterState>((set, get) => ({
  // Initial state
  categoryId: '',
  priceRange: { min: 0, max: 200 },
  selectedPriceFrom: 0,
  selectedPriceTo: 200,
  selectedColors: [],
  selectedSizes: [],
  selectedStyle: undefined,
  selectedSort: 'newest',
  currentPage: 0,
  limit: 2,
  isFilterOpen: false,
  expandedSections: initialExpandedSections,
  products: [],
  totalItems: 0,
  isLoading: false,
  error: null,
  availableColors: [],
  availableSizes: [],

  // Actions
  setCategoryId: (id) => {
    set({ categoryId: id, currentPage: 0 });
  },

  setPriceRange: (min, max) => {
    set({
      priceRange: { min, max },
      selectedPriceFrom: min,
      selectedPriceTo: max,
    });
    set({ currentPage: 0 });
    get().fetchProducts();
  },

  setSelectedPrice: (from, to) => {
    set({ selectedPriceFrom: from, selectedPriceTo: to });
    set({ currentPage: 0 });
    get().fetchProducts();
  },

  toggleColor: (color) => {
    set((state) => {
      const colors = state.selectedColors.includes(color)
        ? state.selectedColors.filter((c) => c !== color)
        : [...state.selectedColors, color];
      return { selectedColors: colors, currentPage: 0 };
    });
    get().fetchProducts();
  },

  toggleSize: (size) => {
    set((state) => {
      const sizes = state.selectedSizes.includes(size)
        ? state.selectedSizes.filter((s) => s !== size)
        : [...state.selectedSizes, size];
      return { selectedSizes: sizes, currentPage: 0 };
    });
    get().fetchProducts();
  },

  setStyle: (style) => {
    set({ selectedStyle: style, currentPage: 0 });
    get().fetchProducts();
  },

  setSort: (sort) => {
    set({ selectedSort: sort });
    get().fetchProducts();
  },

  setPage: (page) => {
    set({ currentPage: page });
    get().fetchProducts();
  },

  setLimit: (limit) => {
    set({ limit, currentPage: 0 });
    get().fetchProducts();
  },

  toggleFilterOpen: () => {
    set((state) => ({ isFilterOpen: !state.isFilterOpen }));
  },

  closeFilter: () => {
    set({ isFilterOpen: false });
  },

  toggleSection: (section) => {
    set((state) => ({
      expandedSections: {
        ...state.expandedSections,
        [section]: !state.expandedSections[section],
      },
    }));
  },

  clearAllFilters: () => {
    set((state) => ({
      selectedColors: [],
      selectedSizes: [],
      selectedStyle: undefined,
      selectedPriceFrom: state.priceRange.min,
      selectedPriceTo: state.priceRange.max,
      currentPage: 0,
      selectedSort: 'newest',
    }));
    get().fetchProducts();
  },

  fetchProducts: async () => {
    const state = get();
    set({ isLoading: true, error: null });

    try {
      const { 
        categoryId, 
        selectedPriceFrom, 
        selectedPriceTo, 
        selectedColors, 
        selectedSizes,
        currentPage,
        limit,
        selectedSort
      } = state;

      const colorParam = selectedColors.length > 0 ? selectedColors.join(',') : undefined;
      const sizeParam = selectedSizes.length > 0 ? selectedSizes.join(',') : undefined;

      const params: FilterParams = {
        id: categoryId,
        from: selectedPriceFrom,
        to: selectedPriceTo,
        color: colorParam,
        size: sizeParam,
        start: currentPage * limit,
        limit: limit,
      };

      const response = await getCategoryDetail(params);
      
      
      let sortedProducts = [...response.data];
      switch (selectedSort) {
        case 'price-asc':
          sortedProducts.sort((a, b) => a.Price - b.Price);
          break;
        case 'price-desc':
          sortedProducts.sort((a, b) => b.Price - a.Price);
          break;
        case 'popular':
          sortedProducts.sort((a, b) => b.View - a.View);
          break;
        default:
          sortedProducts.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
          break;
      }

      set({
        products: sortedProducts,
        totalItems: response.count || sortedProducts.length,
        availableColors: response.available_colors,
        availableSizes: response.available_sizes,  
        isLoading: false,
      });
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      });
    }
  },


  reset: () => {
    set((state) => ({
      selectedColors: [],
      selectedSizes: [],
      selectedStyle: undefined,
      selectedSort: 'newest',
      currentPage: 0,
      selectedPriceFrom: state.priceRange.min,
      selectedPriceTo: state.priceRange.max,
      isFilterOpen: false,
      error: null,
    }));
    get().fetchProducts();
  },

  initCategoryPage: async (id: string) => {
    set({ categoryId: id, currentPage: 0, isLoading: true });
    
    // Gọi song song tất cả các request cần thiết duy nhất 1 lần
    await Promise.all([
      get().fetchProducts(),
    ]);
  },
}));