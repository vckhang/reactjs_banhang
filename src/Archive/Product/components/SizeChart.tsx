import React from 'react';
import { useProductFilterStore } from '../stores/ProductFilterStore';
import FilterSection from './FilterSection';

const sizeChartData = [
  { label: 'Bust', values: { XS: 40.5, S: 40.8, M: 41.0, L: 41.2, XL: 41.4 } },
  { label: 'Waist', values: { XS: 42.4, S: 42.8, M: 43.2, L: 43.6, XL: 44.0 } },
  { label: 'Hips', values: { XS: 46.8, S: 47.2, M: 48.0, L: 48.4, XL: 48.8 } },
  { label: 'Length', values: { XS: 50.5, S: 51.0, M: 51.2, L: 51.4, XL: 51.6 } },
  { label: 'Sleeve', values: { XS: 52.4, S: 52.8, M: 53.0, L: 53.2, XL: 53.4 } },
];

const SizeChart: React.FC = () => {
  const { expandedSections, toggleSection } = useProductFilterStore();

  return (
    <FilterSection
      title="Size Chart"
      isExpanded={expandedSections.sizeChart}
      onToggle={() => toggleSection('sizeChart')}
    >
      <div className="space-y-12">
        {sizeChartData.map((measure) => (
          <div key={measure.label}>
            <p className="text-sm font-medium text-gray-700 mb-6">{measure.label}</p>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(measure.values).map(([size, value]) => (
                <div key={size} className="text-center">
                  <div className="text-xs text-gray-500">{size}</div>
                  <div className="text-sm font-medium text-gray-800">
                    {value.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FilterSection>
  );
};

export default SizeChart;