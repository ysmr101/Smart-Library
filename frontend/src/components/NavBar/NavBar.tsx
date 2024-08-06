import React, { useState } from 'react';
import FilterDropDown from "../../components/FilterDropDown/FilterDropDown";
import Favorite from '../../assets/Favorite.svg';
import FavoriteClicked from '../../assets/FavoriteClicked.svg';
import SearchIcon from '../../assets/SearchIcon.svg';

interface NavBarProps {
  onSearchChange: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearchChange, selectedFilter, setSelectedFilter }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
      <header>
        <div className="flex place-content-center">
          <div className="bg-custom-blue p-4 flex items-center rounded-md px-3 py-2 font-work-sans w-11/12">
            <div className="flex items-center w-full">
              <img src={SearchIcon} alt="Search Icon" className="h-6 w-6 text-teal-400 m-1"/>
              <form className="flex items-center bg-custom-lightblue rounded-md px-3 py-2 w-6/12 m-1">
                <input
                    type="text"
                    placeholder="Type book title/genre/name of author"
                    className="bg-custom-lightblue text-white placeholder-custom-placeholder ml-2 focus:outline-none w-full"
                    onChange={handleInputChange}
                />
              </form>
              <FilterDropDown
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
              />
            </div>
            <button className="ml-auto text-white" onClick={handleFavoriteClick}>
              <img src={isFavorite ? FavoriteClicked : Favorite} alt="Favorite Icon" className="h-8 w-8 text-teal-400"/>
            </button>
          </div>
        </div>
      </header>
  );
}

export default NavBar;

