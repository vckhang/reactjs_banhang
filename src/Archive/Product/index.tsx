import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductFilterStore } from './stores/ProductFilterStore';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import ProductHeader from './components/ProductHeader';
import FilterSidebar from './components/FilterSidebar';
import FilterDrawer from './components/FilterDrawer';
import ProductGrid from './components/ProductGrid';
import ProductPagination from './components/ProductPagination';

const ArchiveProduct: React.FC = () => {
  const { Slug } = useParams<{ Slug: string }>();
 
  const categoryId = Slug;
  
  const {
    isLoading,
    error,
    products,
    initCategoryPage
  } = useProductFilterStore();

  // Initialize
 
  useEffect(() => {
    if (categoryId) {
      initCategoryPage(categoryId);
    }
  }, [categoryId]);


  if (isLoading && products.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="layout mx-auto px-16 py-32">
      <ProductHeader />

      <div className="flex gap-24">
        {/* Desktop Filters */}
        <div className="hidden md:block w-200 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Mobile Filters Drawer */}
        <FilterDrawer />

        {/* Products */}
        <div className="flex-1">
          <ProductGrid />
          <ProductPagination />
        </div>
      </div>
    </div>
  );
};

export default ArchiveProduct;