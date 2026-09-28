import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useProductFilterStore } from '../stores/ProductFilterStore';
import FilterSidebar from './FilterSidebar';

const FilterDrawer: React.FC = () => {
  const { isFilterOpen, toggleFilterOpen } = useProductFilterStore();

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleFilterOpen}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
          >
            <div className="flex items-center justify-between p-16 border-b">
              <h2 className="text-lg font-bold">Bộ lọc</h2>
              <button
                onClick={toggleFilterOpen}
                className="p-4 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-20 h-20" />
              </button>
            </div>
            <div className="p-16">
              <FilterSidebar />
              <button
                className="w-full mt-16 bg-[var(--main-bg)] text-white py-8 rounded-lg font-medium hover:bg-[var(--main-button-hover)] transition-colors"
                onClick={toggleFilterOpen}
              >
                Áp dụng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;