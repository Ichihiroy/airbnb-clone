import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const SearchBar = () => {
  const [active, setActive] = useState({
    where: false,
    checkIn: false,
    checkOut: false,
    guests: false,
    bar: false,
  });

  const [counts, setCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const containerRef = useRef(null);

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

  const destinations = [
    {
      city: "Nearby",
      desc: "Find what’s around you",
      icon: "📍",
      color: "bg-blue-100 text-blue-600",
    },
    {
      city: "Tbilisi, Georgia",
      desc: "For sights like Bridge of Peace",
      icon: "🏙️",
      color: "bg-green-100 text-green-600",
    },
    {
      city: "Baku, Azerbaijan",
      desc: "For its bustling nightlife",
      icon: "🌆",
      color: "bg-amber-100 text-amber-600",
    },
    {
      city: "Istanbul, Türkiye",
      desc: "For its stunning architecture",
      icon: "🏛️",
      color: "bg-blue-100 text-blue-700",
    },
    {
      city: "Batumi, Georgia",
      desc: "For nature-lovers",
      icon: "🌳",
      color: "bg-green-100 text-green-700",
    },
    {
      city: "London, United Kingdom",
      desc: "For sights like Buckingham Palace",
      icon: "🏰",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      city: "Almaty, Kazakhstan",
      desc: "Popular lake destination",
      icon: "🏞️",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const categories = [
    { key: "adults", label: "Adults", sub: "Ages 13 or above" },
    { key: "children", label: "Children", sub: "Ages 2 – 12" },
    { key: "infants", label: "Infants", sub: "Under 2" },
    {
      key: "pets",
      label: "Pets",
      sub: (
        <a href="#" className="underline text-zinc-500 text-sm">
          Bringing a service animal?
        </a>
      ),
    },
  ];

  const handleChange = (key, delta) => {
    setCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  function handleClick(type) {
    setActive({
      bar: true,
      where: type === "where" ? true : false,
      checkIn: type === "checkIn" ? true : false,
      checkOut: type === "checkOut" ? true : false,
      guests: type === "guests" ? true : false,
    });
  }

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
        className={`flex-1 ps-6 pe-0  hover:rounded-full py-3 h-[65px] border-gray-100 border-r-1 group-hover:border-r-transparent relative  ${
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
                  key={index}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-xl "
                >
                  <div className={`rounded-full p-2 ${dest.color}`}>
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

        {active.guests && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-[400px] max-w-md mx-auto absolute right-0 top-20"
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
                      –
                    </button>
                    <span className="w-6 text-center text-base">
                      {counts[key]}
                    </span>
                    <button
                      onClick={() => handleChange(key, 1)}
                      className="w-9 h-9 rounded-full border border-gray-300 bg-white text-2xl flex items-center justify-center text-gray-800 hover:border-gray-400 active:bg-gray-100 transition"
                    >
                      +
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
