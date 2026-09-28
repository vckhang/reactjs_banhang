import React from 'react';
import { Filter } from 'lucide-react';
import { useProductFilterStore } from '../stores/ProductFilterStore';

const ProductHeader: React.FC = () => {
  const { totalItems, selectedSort, setSort, toggleFilterOpen } = useProductFilterStore();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-24">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Clothing</h1>
        <p className="text-sm text-gray-500 mt-4">
          {totalItems} sản phẩm
        </p>
      </div>

      <div className="flex items-center gap-12 mt-12 md:mt-0">
        <select
          className="px-12 py-6 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--main-bg)]"
          value={selectedSort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
          <option value="popular">Phổ biến</option>
        </select>

        <button
          className="md:hidden flex items-center gap-6 px-12 py-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={toggleFilterOpen}
        >
          <Filter className="w-16 h-16" />
          Lọc
        </button>
      </div>
    </div>
  );
};

export default ProductHeader;