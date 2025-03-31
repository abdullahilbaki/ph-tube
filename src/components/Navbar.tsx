import phTubeLogo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Navbar = () => {
  return (
    <div className="container mx-auto px-4 sm:px-0 py-6 border-b-2 border-gray-200">
      <div className="flex justify-between items-center gap-4">
        {/* Logo and Header */}
        <a href="/" className="flex items-center gap-2">
          <img src={phTubeLogo} alt="PH Tube" />
          <h1 className="font-bold text-2xl">
            <span className="text-red-500">PH</span> Tube
          </h1>
        </a>

        {/* Search Box for Large Screens */}
        <SearchBox className="hidden sm:flex" />

        {/* Sort Button */}
        <button
          className="px-4 py-2 bg-gray-300 font-medium rounded-md 
          hover:bg-gray-200 outline-none transition-all duration-200 ease-in-out
          transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Sort videos by views"
        >
          Sort by view
        </button>
      </div>

      {/* Search Box for Small Screens */}
      <SearchBox className="mt-8 flex sm:hidden" />
    </div>
  );
};

interface ClassProps {
  className?: string;
}

const SearchBox: React.FC<ClassProps> = ({ className = "" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${className} flex border-2 border-gray-300 rounded-full overflow-hidden max-w-md mx-auto`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none bg-white text-gray-700 text-sm px-4 py-3"
          aria-label="Search"
        />
        <button
          type="button"
          className="flex items-center justify-center bg-black text-white px-5 py-2 rounded-r-full 
        hover:bg-gray-700 active:bg-gray-600 focus:outline-none cursor-pointer"
          aria-label="Search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
