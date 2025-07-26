import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import AirbnbDatePicker from "./AirbnbDatePicker";
import { PropertyContext } from "../context/PropertyContext";

const SearchBar = () => {
  const { data } = useContext(PropertyContext);

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

  const [filters, setFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
    },
  });

  console.log("Filters:", filters);

  // const [filteredData, setFilteredData] = useState(data);

  // function filterByDestination(city) {
  //   const filtered = data.filter(
  //     (property) => property.location.city === city.split(",")[0]
  //   );
  //   setFilteredData(filtered);
  // }

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

  const destinations = [
    {
      city: "Paris, France",
      desc: "For sights like the Eiffel Tower",
      icon: "🗼",
      color: "bg-pink-100 text-pink-600",
    },
    {
      city: "Amsterdam, Netherlands",
      desc: "For its scenic canals and bikes",
      icon: "🚲",
      color: "bg-blue-100 text-blue-600",
    },
    {
      city: "Berlin, Germany",
      desc: "For its rich history and museums",
      icon: "🏛️",
      color: "bg-gray-100 text-gray-600",
    },
    {
      city: "Lisbon, Portugal",
      desc: "For its vibrant culture and hills",
      icon: "🌉",
      color: "bg-red-100 text-red-600",
    },
    {
      city: "Barcelona, Spain",
      desc: "For Gaudí architecture and beaches",
      icon: "🏖️",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      city: "London, United Kingdom",
      desc: "For sights like Buckingham Palace",
      icon: "🏰",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      city: "Rome, Italy",
      desc: "For its ancient ruins and pasta",
      icon: "🏺",
      color: "bg-green-100 text-green-700",
    },
    {
      city: "Dublin, Ireland",
      desc: "For cozy pubs and folklore",
      icon: "🍀",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      city: "Ljubljana, Slovenia",
      desc: "For a peaceful green escape",
      icon: "🌿",
      color: "bg-green-100 text-green-600",
    },
    {
      city: "Baku, Azerbaijan",
      desc: "For its bustling nightlife",
      icon: "🌆",
      color: "bg-amber-100 text-amber-600",
    },
    {
      city: "Athens, Greece",
      desc: "For ancient ruins and history",
      icon: "🏛️",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      city: "Prague, Czech Republic",
      desc: "For fairy tale castles",
      icon: "🏰",
      color: "bg-purple-100 text-purple-700",
    },
    {
      city: "Vienna, Austria",
      desc: "For music and elegant cafés",
      icon: "🎻",
      color: "bg-red-100 text-red-700",
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

    setFilters({
      ...filters,
      guests: { ...filters.guests, [key]: Math.max(0, counts[key] + delta) },
    });
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
          value={filters.destination}
          type="text"
          placeholder="Search destinations"
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none "
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
                  onClick={() =>
                    setFilters({
                      ...filters,
                      destination: dest.city.split(",")[0],
                    })
                  }
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
          type="text"
          className="text-sm text-gray-600 placeholder-gray-400 outline-none w-[80px]"
          placeholder="Add dates"
          onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
        />

        {active.checkIn || active.checkOut ? (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute w-full h-full flex items-center justify-center shadow-2xl rounded-4xl"
          >
            <div className="absolute z-50 top-7">
              <AirbnbDatePicker />
            </div>
          </motion.div>
        ) : (
          ""
        )}
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
        <div className="text-xs font-medium text-gray-900 ">Check out</div>
        <input
          className="text-sm text-gray-600 placeholder-gray-400 w-[80px]"
          placeholder="Add dates"
        />
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
            className="text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
            placeholder="Add guests"
            value={
              Object.entries(filters.guests)
                .map(([key, value]) => (value ? "" + value + " " + key : " "))
                .join(", ") === " ,  ,  ,  "
                ? ""
                : Object.entries(filters.guests)
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
                    .slice(0, -1)
            }
          />
        </div>
        <div>
          <button
            className={` text-white rounded-full ${
              active.bar ? "p-3" : "p-4"
            } m-2 bg-[#FF385C] hover:bg-[#a1233a] transition-colors flex items-center justify-center gap-2`}
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
