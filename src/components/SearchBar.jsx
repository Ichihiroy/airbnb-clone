import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [active, setActive] = useState(false);

  function handleClick(e) {
    e.target.classList.add("bg-white", "rounded-full");
    setActive(true);
  }

  return (
    <div
      className={`flex
       ${
         active ? "bg-zinc-300" : "bg-white"
       } border my-3 items-center h-full border-zinc-200 rounded-full shadow-sm hover:shadow-md transition-shadow group`}
    >
      <div
        onClick={(e) => handleClick(e)}
        className="flex-1 ps-6 pe-0 hover:bg-zinc-200 hover:rounded-full py-3 h-[65px] border-gray-300 border-r-1 rounded-r-none group-hover:border-r-transparent"
      >
        <div className="text-xs font-medium text-gray-900">Where</div>
        <input
          type="text"
          placeholder="Search destinations"
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>
      <div className=" ps-6 pe-8 py-3 h-[65px]  border-gray-300 hover:bg-zinc-200 hover:rounded-full border-r-1 rounded-r-none group-hover:border-r-transparent">
        <div className="text-xs font-medium text-gray-900 mb-1">Check in</div>
        <div className="text-sm text-gray-400">Add dates</div>
      </div>
      <div className="ps-6 pe-8 py-3 h-[65px] border-gray-300 hover:bg-zinc-200 hover:rounded-full border-r-1 rounded-r-none group-hover:border-r-transparent">
        <div className="text-xs font-medium text-gray-900 mb-1">Check out</div>
        <div className="text-sm text-gray-400">Add dates</div>
      </div>
      <div className="flex items-center justify-between h-[65px] flex-1 ps-6 pe-0.5 gap-3 border-gray-300 hover:bg-zinc-200 hover:rounded-full rounded-r-none">
        <div className="flex flex-col items-start">
          <div className="text-xs font-medium text-gray-900">Who</div>
          <div className="text-sm text-gray-400">Add guests</div>
        </div>
        <div>
          <button className="bg-red-500 text-white rounded-full p-4 m-2 hover:bg-red-600 transition-colors">
            <Search size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
