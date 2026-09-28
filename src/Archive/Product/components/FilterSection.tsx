import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <div className="border-b border-gray-200 pb-12">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-8 hover:text-[var(--main-bg)] transition-colors"
      >
        <span className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
          {title}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-16 h-16 text-gray-400" />
        ) : (
          <ChevronDown className="w-16 h-16 text-gray-400" />
        )}
      </button>
      {isExpanded && <div className="mt-8">{children}</div>}
    </div>
  );
};

export default FilterSection;