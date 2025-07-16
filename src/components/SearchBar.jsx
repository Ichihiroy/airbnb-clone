import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const [active, setActive] = useState({
    where: false,
    checkIn: false,
    checkOut: false,
    guests: false,
    bar: false,
  });
  const containerRef = useRef(null);

  function handleClick(type) {
    // e.target.classList.add("bg-white", "rounded-full");
    setActive({
      bar: true,
      where: type === "where" ? true : false,
      checkIn: type === "checkIn" ? true : false,
      checkOut: type === "checkOut" ? true : false,
      guests: type === "guests" ? true : false,
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        console.log("Clicked outside", containerRef, event.target);
        setActive({
          where: false,
          bar: false,
          checkIn: false,
          checkOut: false,
          guests: false,
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActive]);

  return (
    <div
      ref={containerRef}
      className={`flex
       ${
         active.bar ? "bg-gray-100" : "bg-white"
       } border my-3 items-center h-full border-zinc-200 rounded-full shadow-sm hover:shadow-md transition-shadow group`}
    >
      <div
        onClick={() => handleClick("where")}
        className={`flex-1 ps-6 pe-0  hover:rounded-full py-3 h-[65px] border-gray-100 border-r-1 group-hover:border-r-transparent ${
          active.where
            ? "bg-white rounded-full shadow-lg"
            : "rounded-r-none hover:rounded-full hover:bg-zinc-200"
        }`}
      >
        <div className="text-xs font-medium text-gray-900">Where</div>
        <input
          type="text"
          placeholder="Search destinations"
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>

      <div
        onClick={() => handleClick("checkIn")}
        className={`ps-6 pe-8 py-3 h-[65px]  border-gray-100  border-r-1 group-hover:border-r-transparent
          ${
            active.checkIn
              ? "bg-white rounded-full shadow-lg group-focus:border-r-transparent"
              : "rounded-r-none hover:rounded-full hover:bg-zinc-200"
          }
          `}
      >
        <div className="text-xs font-medium text-gray-900 mb-1">Check in</div>
        <div className="text-sm text-gray-400">Add dates</div>
      </div>
      <div
        onClick={() => handleClick("checkOut")}
        className={`ps-6 pe-8 py-3 h-[65px] border-gray-100   border-r-1 group-hover:border-r-transparent
          ${
            active.checkOut
              ? "bg-white rounded-full shadow-lg"
              : "rounded-r-none hover:rounded-full hover:bg-zinc-200"
          }
          `}
      >
        <div className="text-xs font-medium text-gray-900 mb-1">Check out</div>
        <div className="text-sm text-gray-400">Add dates</div>
      </div>
      <div
        onClick={() => handleClick("guests")}
        className={`flex items-center justify-between h-[65px] flex-1 ps-6 pe-0.5 gap-3 border-gray-100  
          ${
            active.guests
              ? "bg-white rounded-full shadow-lg"
              : "rounded-r-none hover:bg-zinc-200 hover:rounded-full"
          }
        `}
      >
        <div className="flex flex-col items-start">
          <div className="text-xs font-medium text-gray-900">Who</div>
          <div className="text-sm text-gray-400">Add guests</div>
        </div>
        <div>
          <button
            className={`bg-red-500 text-white rounded-full ${
              active.bar ? "p-3" : "p-4"
            } m-2 hover:bg-red-600 transition-colors flex items-center justify-center gap-2`}
          >
            <Search size={16} />

            {/* {active.bar ? "Search" : ""} */}
            <AnimatePresence>
              {active.bar && (
                <motion.span
                  key="text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Search
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
