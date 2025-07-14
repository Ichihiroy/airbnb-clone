import { Search } from "lucide-react";

const SearchBar = ({ isMobile = false }) => (
  <div
    className={`${
      isMobile ? "w-full" : "hidden lg:flex"
    } bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow`}
  >
    <div className="flex-1 px-6 py-3 border-r border-gray-300">
      <div className="text-xs font-medium text-gray-900">Where</div>
      <input
        type="text"
        placeholder="Search destinations"
        className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none"
      />
    </div>
    <div className="flex-1 px-6 py-3 border-r border-gray-300">
      <div className="text-xs font-medium text-gray-900">Check in</div>
      <div className="text-sm text-gray-400">Add dates</div>
    </div>
    <div className="flex-1 px-6 py-3 border-r border-gray-300">
      <div className="text-xs font-medium text-gray-900">Check out</div>
      <div className="text-sm text-gray-400">Add dates</div>
    </div>
    <div className="flex-1 px-6 py-3">
      <div className="text-xs font-medium text-gray-900">Who</div>
      <div className="text-sm text-gray-400">Add guests</div>
    </div>
    <button className="bg-red-500 text-white rounded-full p-3 px-4 m-2 hover:bg-red-600 transition-colors">
      <Search size={16} />
    </button>
  </div>
);

export default SearchBar;
