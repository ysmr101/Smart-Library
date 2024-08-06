import React, { useState , useEffect, useRef }  from 'react';
import Filter from '../../assets/Filter.svg';

interface FilterDropDownProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const FilterDropDown: React.FC<FilterDropDownProps> = ({ selectedFilter, setSelectedFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };
 useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref = {dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <img src={Filter} alt="Filter Icon"/>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-custom-blue ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a href="" className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} onClick={() => handleFilterClick('Most Trending')}>Most Trending</a>
            <a href="" className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} onClick={() => handleFilterClick('Recently Added')}>Recently Added</a>
            <a href="" className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} onClick={() => handleFilterClick('Recommended')}>Recommended</a>
            <a href="" className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} onClick={() => handleFilterClick('Most recent publish year')}>Most recent publish year</a>
            <a href="" className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} onClick={() => handleFilterClick('Earliest publish year')}>Earliest publish year</a>
            <a href="" className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} onClick={() => handleFilterClick('Top rated')}>Top rated</a>
            <a href="" className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} onClick={() => handleFilterClick('Least rated')}>Least rated</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;

