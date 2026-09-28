import React from 'react';
import { X } from 'lucide-react';
import { useProductFilterStore } from '../stores/ProductFilterStore';

const ClearFilters: React.FC = () => {
  const {
    selectedColors,
    selectedSizes,
    selectedPriceFrom,
    selectedPriceTo,
    priceRange,
    clearAllFilters,
  } = useProductFilterStore();

  const hasActiveFilters =
    selectedColors.length > 0 ||
    selectedSizes.length > 0 ||
    selectedPriceFrom > priceRange.min ||
    selectedPriceTo < priceRange.max;

  if (!hasActiveFilters) return null;

  return (
    <button
      onClick={clearAllFilters}
      className="text-sm text-[var(--main-bg)] hover:underline flex items-center gap-4 transition-colors"
    >
      <X className="w-12 h-12" />
      Xóa tất cả bộ lọc
    </button>
  );
};

export default ClearFilters;