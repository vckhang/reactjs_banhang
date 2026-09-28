import React from 'react';
import ClearFilters from './ClearFilters';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import SizeFilter from './SizeFilter';


const FilterSidebar: React.FC = () => {
  return (
    <div className="space-y-16">
      <ClearFilters />
      
      
      <PriceFilter />
      <ColorFilter />
      <SizeFilter />
     
    </div>
  );
};

export default FilterSidebar;