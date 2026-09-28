import React from 'react';
import { useProductFilterStore } from '../stores/ProductFilterStore';
import FilterSection from './FilterSection';

const SizeFilter: React.FC = () => {
  const {
    availableSizes,
    selectedSizes,
    expandedSections,
    toggleSize,
    toggleSection,
  } = useProductFilterStore();

  if (availableSizes.length === 0) return null;

  return (
    <FilterSection
      title="Size"
      isExpanded={expandedSections.size}
      onToggle={() => toggleSection('size')}
    >
      <div className="flex flex-wrap gap-8">
        {availableSizes.map((size) => (
          <button
            key={size.id}
            onClick={() => toggleSize(size.id)}
            className={`w-32 h-32 rounded-lg text-sm font-medium transition-all border ${
              selectedSizes.includes(size.id)
                ? 'border-[var(--main-bg)] bg-[var(--main-bg)] text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {size.name}
          </button>
        ))}
      </div>
    </FilterSection>
  );
};

export default SizeFilter;