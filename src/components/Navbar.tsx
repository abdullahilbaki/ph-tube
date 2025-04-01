// Navbar.tsx

import React, { useState } from "react";
import phTubeLogo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  onSearch: (query: string) => void;
  onSortByView: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onSortByView }) => {
  return (
    <nav className="container mx-auto px-4 sm:px-0 pb-6 border-b-2 border-gray-200">
      <div className="flex justify-between items-center gap-4">
        <a href="/" className="flex items-center gap-2">
          <img src={phTubeLogo} alt="PH Tube Logo" />
          <h1 className="font-bold text-2xl">
            <span className="text-red-500">PH</span> Tube
          </h1>
        </a>

        <SearchBar className="hidden sm:flex" onSearch={onSearch} />

        <button
          className="px-4 py-2 bg-gray-300 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          aria-label="Sort videos by views"
          onClick={onSortByView}
        >
          Sort by view
        </button>
      </div>

      <SearchBar className="mt-8 flex sm:hidden" onSearch={onSearch} />
    </nav>
  );
};

interface SearchBarProps {
  className?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = "", onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${className} flex border-2 border-gray-300 rounded-full overflow-hidden max-w-md mx-auto`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-3 text-sm text-gray-700 bg-white outline-none"
          aria-label="Search input"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <button
          type="button"
          className="flex items-center justify-center px-5 py-2 bg-black text-white rounded-r-full hover:bg-gray-700 active:bg-gray-600 focus:outline-none cursor-pointer"
          aria-label="Search button"
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
