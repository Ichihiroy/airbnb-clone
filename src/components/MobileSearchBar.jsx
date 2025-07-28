import React, { useContext, useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { FiltersContext } from "../context/FiltersContext";
import AirbnbDatePicker from "./AirbnbDatePicker";

export default function MobileSearchBar({ setIsOpen }) {
  const [openSection, setOpenSection] = useState(null);
  const {
    filters,
    setFilters,
    handleChange,
    counts,
    destinations,
    categories,
  } = useContext(FiltersContext);

  const toggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    toggle("where");
  }, []);

  console.log("MobileSearchBar filters:", filters);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-50 w-full h-full md:hidden overflow-y-scroll bg-gray-100 pb-2">
      <div className="bg-gray-100 w-full rounded-t-xl p-5 h-full z-50 flex flex-col justify-between">
        <div>
          <div className="flex justify-end items-center mb-6">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="bg-white shadow-lg rounded-full p-2.5 "
            >
              <X size={20} />
            </button>
          </div>

          <div
            className={`mb-4 bg-white ${
              openSection === "where" ? "rounded-3xl" : "rounded-2xl"
            } shadow-md px-3 py-1`}
          >
            <button
              className="w-full flex items-center justify-between py-3 px-2 rounded-lg "
              onClick={() => toggle("where")}
            >
              <div className="flex items-center space-x-2">
                {openSection === "where" ? (
                  <span className="text-xl font-bold text-black">Where?</span>
                ) : (
                  <span className="text-sm text-gray-500">Where</span>
                )}
              </div>
              {openSection === "where" ? (
                ""
              ) : (
                <input
                  value={filters.destination}
                  type="text"
                  readOnly
                  placeholder="Add location"
                  className=" rounded-lg  py-2 text-right placeholder-black text-sm"
                />
              )}
            </button>

            {openSection === "where" && (
              <div className=" h-[350px] rounded-4xl overflow-hidden py-5 overflow-y-auto overflow-x-hidden">
                <h2 className="text-sm font-light px-2 pb-1 text-gray-500">
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
                      className="flex items-center gap-4 px-2 py-3 hover:bg-gray-100 cursor-pointer rounded-xl "
                    >
                      <div className={`rounded-lg p-2 ${dest.color}`}>
                        <span className="text-xl">{dest.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {dest.city}
                        </h3>
                        <p className="text-sm text-gray-500">{dest.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div
            className={`mb-4 bg-white ${
              openSection === "when" ? "rounded-3xl" : "rounded-2xl"
            } shadow-md px-3 py-1`}
          >
            <button
              className="w-full flex items-center justify-between py-3 px-2 rounded-lg "
              onClick={() => toggle("when")}
            >
              <div className="flex items-center space-x-2">
                {openSection === "when" ? (
                  <span className="text-xl font-bold text-black">When?</span>
                ) : (
                  <span className="text-sm text-gray-500">When</span>
                )}
              </div>
              {openSection === "when" ? (
                ""
              ) : (
                <input
                  value={
                    filters.checkIn && filters.checkOut
                      ? `${filters.checkIn} - ${filters.checkOut}`
                      : ""
                  }
                  readOnly
                  type="text"
                  placeholder="Add dates"
                  className=" rounded-lg  py-2 text-right placeholder-black text-sm"
                />
              )}
            </button>
            {openSection === "when" && (
              <div className="mt-2">
                <AirbnbDatePicker setFilters={setFilters} filters={filters} />
              </div>
            )}
          </div>

          <div
            className={`mb-6 bg-white ${
              openSection === "who" ? "rounded-3xl" : "rounded-2xl"
            } shadow-md px-3 py-1`}
          >
            <button
              className="w-full flex items-center justify-between py-3 px-2 rounded-lg "
              onClick={() => toggle("who")}
            >
              <div className="flex items-center space-x-2">
                {openSection === "who" ? (
                  <span className="text-xl font-bold text-black">Who?</span>
                ) : (
                  <span className="text-sm text-gray-500">Who</span>
                )}
              </div>
              {openSection === "who" ? (
                ""
              ) : (
                <input
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
                  type="text"
                  readOnly
                  placeholder="Add guests"
                  className=" rounded-lg  py-2 text-right placeholder-black text-sm"
                />
              )}
            </button>
            {openSection === "who" && (
              <div className="bg-white p-2 w-full ">
                {categories.map(({ key, label, sub }, idx) => (
                  <React.Fragment key={key}>
                    {idx !== 0 && <hr className="my-2 border-gray-200" />}
                    <div className="flex items-center justify-between min-h-[60px]">
                      <div>
                        <div className="font-semibold text-md">{label}</div>
                        <div className="text-gray-500 text-sm mt-1">
                          {typeof sub === "string" ? sub : sub}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleChange(key, -1)}
                          disabled={counts[key] === 0}
                          className={`w-7 h-7 p-1 rounded-full border border-gray-300 bg-white text-2xl flex items-center justify-center transition
                  ${
                    counts[key] === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-800 hover:border-gray-400 active:bg-gray-100"
                  }`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-base">
                          {counts[key]}
                        </span>
                        <button
                          onClick={() => handleChange(key, 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 bg-white text-2xl flex items-center justify-center text-gray-800 hover:border-gray-400 active:bg-gray-100 transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button className="underline">Clear all</button>
          <button className="px-6 flex items-center justify-center space-x-2 bg-black text-white font-semibold py-3 rounded-lg hover:opacity-90">
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { MobileSearchBar };
