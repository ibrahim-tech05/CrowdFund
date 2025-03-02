import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Find a Campaign</h2>
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
