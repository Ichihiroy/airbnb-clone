import { useEffect, useState } from "react";
import {
  Calendar,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

export default function MobileSearchBar({ setIsOpen }) {
  const [openSection, setOpenSection] = useState(null);

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

  const toggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    toggle("where");
  }, []);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-end z-50 w-full h-full md:hidden">
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
                  type="text"
                  readOnly
                  placeholder="Add location"
                  className=" rounded-lg  py-2 text-right placeholder-black text-sm"
                />
              )}
            </button>

            {openSection === "where" && (
              <div className=" h-[300px] rounded-4xl overflow-hidden py-5 overflow-y-auto overflow-x-hidden">
                <h2 className="text-sm font-light px-4 pb-1 ">
                  Suggested destinations
                </h2>
                <ul>
                  {destinations.map((dest, index) => (
                    <li
                      // onClick={() =>
                      //   setFilters({
                      //     ...filters,
                      //     destination: dest.city.split(",")[0],
                      //   })
                      // }
                      key={index}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-xl "
                    >
                      <div className={`rounded-full p-2 ${dest.color}`}>
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
                  readOnly
                  type="text"
                  placeholder="Add dates"
                  className=" rounded-lg  py-2 text-right placeholder-black text-sm"
                />
              )}
            </button>
            {openSection === "when" && (
              <div className="mt-2">{/* Replace with your date-picker */}</div>
            )}
          </div>

          {/* Who Section */}
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
                  type="text"
                  readOnly
                  placeholder="Add guests"
                  className=" rounded-lg  py-2 text-right placeholder-black text-sm"
                />
              )}
            </button>
            {openSection === "who" && (
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <span>Guests</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    className="w-16 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
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
