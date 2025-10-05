import React from 'react';
import { Filter } from '../types';

interface FilterButtonsProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { label: 'All', value: Filter.ALL },
    { label: 'Active', value: Filter.ACTIVE },
    { label: 'Completed', value: Filter.COMPLETED },
  ];

  const baseClasses = 'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500';
  const activeClasses = 'bg-sky-600 text-white';
  const inactiveClasses = 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200';

  return (
    <div className="flex justify-center space-x-2">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`${baseClasses} ${currentFilter === filter.value ? activeClasses : inactiveClasses}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
