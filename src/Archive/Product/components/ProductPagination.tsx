import React from 'react';
import { useProductFilterStore } from '../stores/ProductFilterStore';

const ProductPagination: React.FC = () => {
  const { currentPage, limit, totalItems, setPage } = useProductFilterStore();
  const totalPages = Math.ceil(totalItems / limit);
  const hasMore = totalItems > (currentPage + 1) * limit;

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else if (currentPage < 3) {
      for (let i = 0; i < maxVisible; i++) pages.push(i);
    } else if (currentPage > totalPages - 3) {
      for (let i = totalPages - maxVisible; i < totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-8 mt-32">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-12 py-6 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
      >
        Trước
      </button>

      <div className="flex gap-6">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-32 h-32 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-[var(--main-bg)] text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasMore}
        className="px-12 py-6 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
      >
        Sau
      </button>
    </div>
  );
};

export default ProductPagination;