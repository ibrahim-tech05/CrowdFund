import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search for campaigns..."
            className="w-full max-w-md px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16213e]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-[#1a1a2e] text-white px-4 py-[14px] rounded-r-full hover:bg-[#16213e] transition duration-300">
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
