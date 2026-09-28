import React from 'react';
import { useProductFilterStore } from '../stores/ProductFilterStore';
import FilterSection from './FilterSection';

const ColorFilter: React.FC = () => {
  const {
    availableColors,
    selectedColors,
    expandedSections,
    toggleColor,
    toggleSection,
  } = useProductFilterStore();

  if (availableColors.length === 0) return null;

  return (
    <FilterSection
      title="Color"
      isExpanded={expandedSections.color}
      onToggle={() => toggleSection('color')}
    >
      <div className="flex flex-wrap gap-8">
        {availableColors.map((color) => (
          <button
            key={color.id}
            onClick={() => toggleColor(color.id)}
            className={`px-12 py-6 rounded-lg text-sm font-medium transition-all border ${
              selectedColors.includes(color.id)
                ? 'border-[var(--main-bg)] bg-[var(--main-bg)] text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {color.name}
          </button>
        ))}
      </div>
    </FilterSection>
  );
};

export default ColorFilter;