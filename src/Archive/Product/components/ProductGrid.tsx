import React from 'react';
import { useProductFilterStore } from '../stores/ProductFilterStore';
import ProductCard from '../../../Component/ProductCard';

const ProductGrid: React.FC = () => {
  const { products, clearAllFilters } = useProductFilterStore();

  if (products.length === 0) {
    return (
      <div className="text-center py-40">
        <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
        <button
          onClick={clearAllFilters}
          className="mt-12 text-[var(--main-bg)] hover:underline transition-colors"
        >
          Xóa tất cả bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;