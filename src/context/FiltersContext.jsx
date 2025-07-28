import React, { createContext, useState } from "react";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
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
  const [filteredData, setFilteredData] = useState([]);

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

  const [counts, setCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

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

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        handleChange,
        counts,
        setCounts,
        destinations,
        categories,
        filteredData,
        setFilteredData,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersContext };
