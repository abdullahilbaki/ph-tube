import phTubeLogo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="container mx-auto px-4 sm:px-0 py-6 flex items-center border-b-2 border-gray-200">
      {/* logo and header */}

      <a href="/" className="flex items-center gap-2">
        <img src={phTubeLogo} alt="PH Tube" />
        <h1 className="font-bold text-2xl">
          <span className="text-red-500">PH</span> Tube
        </h1>
      </a>

      {/* search box */}

      <div
        className="flex rounded-4xl border-2 border-gray-300 
        overflow-hidden max-w-md mx-auto"
      >
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search..."
          className="w-full outline-none bg-white text-gray-700 text-sm 
          px-4 py-3 focus:ring-0 rounded-md"
          aria-labelledby="search-input"
        />
        <button
          type="button"
          className="flex items-center justify-center bg-black text-white 
          px-5 py-2 ml-2 rounded-r-md hover:bg-gray-700 active:bg-gray-600 
          focus:outline-none cursor-pointer"
          aria-label="Search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* sort button */}

      <button
        className="px-4 py-2 bg-gray-300 font-medium rounded-md 
      hover:bg-gray-200 outline-none transition-all duration-200 ease-in-out
        transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        Sort by view
      </button>
    </div>
  );
};

export default Navbar;
