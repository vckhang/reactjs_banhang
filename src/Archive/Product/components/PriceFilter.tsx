import React, { useState, useEffect } from 'react';
import { useProductFilterStore } from '../stores/ProductFilterStore';
import FilterSection from './FilterSection';

const PriceFilter: React.FC = () => {
  const {
    priceRange,
    selectedPriceFrom,
    selectedPriceTo,
    expandedSections,
    setSelectedPrice,
    toggleSection,
  } = useProductFilterStore();

  // Local state để kéo mượt mà không trigger re-render API liên tục
  const [localFrom, setLocalFrom] = useState(selectedPriceFrom);
  const [localTo, setLocalTo] = useState(selectedPriceTo);

  // Cập nhật local state khi store thay đổi từ ngoài
  useEffect(() => {
    setLocalFrom(selectedPriceFrom);
    setLocalTo(selectedPriceTo);
  }, [selectedPriceFrom, selectedPriceTo]);

  // Hàm đẩy giá trị lên Store để gọi API
  const handleApplyFilter = () => {
    if (localFrom !== selectedPriceFrom || localTo !== selectedPriceTo) {
      setSelectedPrice(localFrom, localTo);
    }
  };

  // Tính % để vẽ vạch màu nằm giữa 2 con trỏ
  const minPercent = Math.min(
    100,
    Math.max(0, ((localFrom - priceRange.min) / (priceRange.max - priceRange.min || 1)) * 100)
  );
  const maxPercent = Math.min(
    100,
    Math.max(0, ((localTo - priceRange.min) / (priceRange.max - priceRange.min || 1)) * 100)
  );

  return (
    <FilterSection
      title="PRICE"
      isExpanded={expandedSections.price}
      onToggle={() => toggleSection('price')}
    >
      <div className="space-y-4 pt-2 flex flex-col">
        {/* Hiển thị khoảng giá */}
        <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
          <span>${localFrom.toLocaleString()}</span>
          <span className="text-gray-400">—</span>
          <span>${localTo.toLocaleString()}</span>
        </div>

        {/* Dual Range Slider ghép chung 1 thanh */}
        <div className="relative w-full h-6 flex items-center select-none">
          {/* Thanh xám nền */}
          <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
          
          {/* Thanh màu nổi bật nối giữa 2 nút */}
          <div
            className="absolute h-1.5 bg-[var(--main-bg)] rounded-full"
            style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
          />

          {/* Input Min */}
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={localFrom}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), localTo - 1);
              setLocalFrom(val);
            }}
            onMouseUp={handleApplyFilter}
            onTouchEnd={handleApplyFilter}
            className="thumb absolute w-full h-1.5 opacity-0 cursor-pointer pointer-events-auto z-30"
          />

          {/* Input Max */}
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={localTo}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), localFrom + 1);
              setLocalTo(val);
            }}
            onMouseUp={handleApplyFilter}
            onTouchEnd={handleApplyFilter}
            className="thumb absolute w-full h-1.5 opacity-0 cursor-pointer pointer-events-auto z-40"
          />

          {/* Nút kéo Min giả lập UI */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-[var(--main-bg)] rounded-full shadow cursor-pointer -translate-x-1/2 z-10 pointer-events-none"
            style={{ left: `${minPercent}%` }}
          />

          {/* Nút kéo Max giả lập UI */}
          <div
            className="absolute w-4 h-4 bg-white border-2 border-[var(--main-bg)] rounded-full shadow cursor-pointer -translate-x-1/2 z-20 pointer-events-none"
            style={{ left: `${maxPercent}%` }}
          />
        </div>

        {/* Khung nhập giá tiền & Nút Filter */}
        <div className="flex items-center gap-2 pt-1">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
            <input
              type="number"
              value={localFrom}
              onChange={(e) => setLocalFrom(Number(e.target.value))}
              onBlur={handleApplyFilter}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyFilter()}
              className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[var(--main-bg)]"
            />
          </div>

          <span className="text-gray-400 text-xs">-</span>

          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
            <input
              type="number"
              value={localTo}
              onChange={(e) => setLocalTo(Number(e.target.value))}
              onBlur={handleApplyFilter}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyFilter()}
              className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-[var(--main-bg)]"
            />
          </div>

        </div>
        
          <button
            onClick={handleApplyFilter}
            className="px-5 py-4 bg-[var(--main-bg)] text-white rounded text-xs font-medium hover:opacity-90 transition-opacity m"
          >
            Lọc
          </button>
      </div>
    </FilterSection>
  );
};

export default PriceFilter;