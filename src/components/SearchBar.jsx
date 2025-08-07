import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PropertyContext } from "../context/PropertyContext";
import { FiltersContext } from "../context/FiltersContext";
import { Minus, Plus, Search, X } from "lucide-react";
import AirbnbDatePicker from "./AirbnbDatePicker";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const { data } = useContext(PropertyContext);
  const {
    filters,
    setFilters,
    counts,
    handleChange,
    destinations,
    categories,
    setFilteredData,
    setCounts,
    filterData,
  } = useContext(FiltersContext);

  const navigate = useNavigate();

  const [active, setActive] = useState({
    where: false,
    checkIn: false,
    checkOut: false,
    guests: false,
    bar: false,
  });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  function handleSearch() {
    filterData();
    navigate("/filters");
  }

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
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

  function handleClick(type) {
    setActive({
      bar: true,
      where: type === "where" ? true : false,
      checkIn: type === "checkIn" ? true : false,
      checkOut: type === "checkOut" ? true : false,
      guests: type === "guests" ? true : false,
    });
  }

  function handleClear(type) {
    setFilters({
      ...filters,
      [type]:
        type === "guests"
          ? { adults: 0, children: 0, infants: 0, pets: 0 }
          : "",
    });
  }

  return (
    <div
      ref={containerRef}
      className={`flex cursor-pointer
       ${
         active.bar ? "bg-gray-100" : "bg-white"
       } border my-3 items-center h-full border-zinc-200 rounded-full shadow-sm hover:shadow-md transition-shadow group`}
    >
      <div
        onClick={() => handleClick("where")}
        className={`flex-1 ps-6 pe-0  hover:rounded-full py-3 h-[65px] border-gray-100 border-r-1 group-hover:border-r-transparent relative  ${
          active.where
            ? "bg-white rounded-full shadow-lg"
            : "rounded-r-none hover:rounded-full hover:bg-zinc-200"
        }`}
      >
        <div className="text-xs font-medium text-gray-900">Where</div>
        <input
          value={filters.destination}
          readOnly
          type="text"
          placeholder="Search destinations"
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none "
        />

        {active.where && (
          <div className="absolute top-0 right-0 h-full flex items-center pr-4 ">
            <button
              onClick={() => handleClear("destination")}
              className="text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200 cursor-pointer"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        )}

        {active.where ? (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-[400px] max-w-md mx-auto mt-10 h-[400px] rounded-4xl overflow-hidden shadow-lg bg-white absolute left-0 top-10 p-5 overflow-y-auto overflow-x-hidden"
          >
            <h2 className="text-sm font-light px-4 pb-1 ">
              Suggested destinations
            </h2>
            <ul>
              {destinations.map((dest, index) => (
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilters({
                      ...filters,
                      destination: dest.city.split(",")[0],
                    });
                    setTimeout(() => {
                      setActive({
                        where: false,
                        checkIn: false,
                        checkOut: false,
                        guests: false,
                        bar: false,
                      });
                    }, 50);
                  }}
                  key={index}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-xl "
                >
                  <div className={`rounded-lg p-2 ${dest.color}`}>
                    <span className="text-xl">{dest.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{dest.city}</h3>
                    <p className="text-sm text-gray-500">{dest.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : (
          ""
        )}
      </div>

      <div
        onClick={() => handleClick("checkIn")}
        className={`ps-6 pe-8 py-3 h-[65px]  border-gray-100  border-r-1 group-hover:border-r-transparent relative
          ${
            active.checkIn
              ? "bg-white rounded-full shadow-lg group-focus:border-r-transparent"
              : "rounded-r-none hover:rounded-full hover:bg-zinc-200"
          }
          `}
      >
        <div className="text-xs font-medium text-gray-900 ">Check in</div>
        <input
          value={filters.checkIn}
          readOnly
          onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
          type="text"
          className="text-sm text-gray-600 placeholder-gray-400 outline-none w-[85px] cursor-pointer"
          placeholder="Add dates"
        />

        {active.checkIn && (
          <div className="absolute top-0 right-0 h-full flex items-center pr-4">
            <button
              onClick={() => handleClear("checkIn")}
              className="text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200 cursor-pointer"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        )}

        {active.checkIn || active.checkOut ? (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute w-full h-full flex items-center justify-center shadow-2xl rounded-4xl"
          >
            <div className="absolute z-50 top-7">
              <AirbnbDatePicker
                months={2}
                setFilters={setFilters}
                filters={filters}
                handleClick={handleClick}
              />
            </div>
          </motion.div>
        ) : (
          ""
        )}
      </div>
      <div
        onClick={() => handleClick("checkOut")}
        className={`ps-6 pe-8 py-3 h-[65px] border-gray-100  relative  border-r-1 group-hover:border-r-transparent
          ${
            active.checkOut
              ? "bg-white rounded-full shadow-lg"
              : "rounded-r-none hover:rounded-full hover:bg-zinc-200"
          }
          `}
      >
        <div className="text-xs font-medium text-gray-900 ">Check out</div>
        <input
          readOnly
          value={filters.checkOut}
          onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
          className="text-sm text-gray-600 placeholder-gray-400 w-[85px] cursor-pointer"
          placeholder="Add dates"
        />
        {active.checkOut && (
          <div className="absolute top-0 right-0 h-full flex items-center pr-4">
            <button
              onClick={() => handleClear("checkOut")}
              className="text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200 cursor-pointer"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
      <div
        onClick={() => handleClick("guests")}
        className={`flex items-center justify-between h-[65px] flex-1 ps-6 pe-0.5 gap-3 border-gray-100  relative
          ${
            active.guests
              ? "bg-white rounded-full shadow-lg"
              : "rounded-r-none hover:bg-zinc-200 hover:rounded-full"
          }
        `}
      >
        <div className="flex flex-col items-start">
          <div className="text-xs font-medium text-gray-900">Who</div>
          <input
            className="text-sm text-gray-600 placeholder-gray-400 outline-none w-full cursor-pointer"
            placeholder="Add guests"
            readOnly
            value={Object.entries(filters.guests)
              .map(([key, value]) =>
                value
                  ? value +
                    " " +
                    (key !== "children" && value == 1
                      ? key.slice(0, -1)
                      : key) +
                    ","
                  : ""
              )
              .join(" ")
              .trim()
              .slice(0, -1)}
          />
        </div>
        {active.guests && (
          <div className="absolute top-0 right-26 h-full flex items-center pr-4">
            <button
              onClick={() => {
                handleClear("guests");
                setCounts({
                  adults: 0,
                  children: 0,
                  infants: 0,
                  pets: 0,
                });
              }}
              className="text-gray-500 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200 cursor-pointer"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>
        )}
        <div>
          <button
            onClick={() => handleSearch()}
            className={` text-white rounded-full ${
              active.bar ? "p-3" : "p-4"
            } m-2  bg-gradient-to-r from-[#FF385C] to-[#FF385C] hover:from-rose-600 hover:to-pink-700 transition-colors flex items-center justify-center gap-2 cursor-pointer`}
          >
            <Search size={16} />
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

        {active.guests && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white rounded-4xl shadow-2xl p-8 w-[400px] max-w-md mx-auto absolute right-0 top-20"
          >
            {categories.map(({ key, label, sub }, idx) => (
              <React.Fragment key={key}>
                {idx !== 0 && <hr className="my-5 border-gray-200" />}
                <div className="flex items-center justify-between min-h-[60px]">
                  <div>
                    <div className="font-semibold text-lg">{label}</div>
                    <div className="text-gray-500 text-sm mt-1">
                      {typeof sub === "string" ? sub : sub}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleChange(key, -1)}
                      disabled={counts[key] === 0}
                      className={`w-9 h-9 p-1 rounded-full border border-gray-300 bg-white text-2xl flex items-center justify-center transition
                  ${
                    counts[key] === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-800 hover:border-gray-400 active:bg-gray-100"
                  }`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center text-base">
                      {counts[key]}
                    </span>
                    <button
                      onClick={() => handleChange(key, 1)}
                      className="w-9 h-9 rounded-full border border-gray-300 bg-white text-2xl flex items-center justify-center text-gray-800 hover:border-gray-400 active:bg-gray-100 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
