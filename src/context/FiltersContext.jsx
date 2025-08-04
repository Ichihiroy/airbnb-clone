import React, { createContext, useState } from "react";
import { addDays } from "date-fns";

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
    priceRange: [],
    propertyTypes: [],
    amenities: [],
    bedrooms: 0,
    bathrooms: 0,
    instantBook: false,
  });
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [range, setRange] = useState([
    {
      startDate:
        filters?.checkIn && !isNaN(new Date(filters.checkIn))
          ? new Date(filters.checkIn)
          : new Date(),
      endDate:
        filters?.checkOut && !isNaN(new Date(filters.checkOut))
          ? new Date(filters.checkOut)
          : addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const applyFilters = (data, filterCriteria) => {
    if (!data || data.length === 0) return [];

    let filtered = data;

    if (filterCriteria.destination) {
      filtered = filtered.filter(
        (property) =>
          property.location.city
            .toLowerCase()
            .includes(filterCriteria.destination.toLowerCase()) ||
          property.location.country
            .toLowerCase()
            .includes(filterCriteria.destination.toLowerCase())
      );
    }

    if (filterCriteria.priceRange && filterCriteria.priceRange.length === 2) {
      filterCriteria.priceRange[0] = filterCriteria.priceRange[0] || 0;
      filterCriteria.priceRange[1] = filterCriteria.priceRange[1] || Infinity;
      filtered = filtered.filter((property) => {
        const price = parseInt(property.price.total);
        return (
          price >= filterCriteria.priceRange[0] &&
          price <= filterCriteria.priceRange[1]
        );
      });
    }

    if (
      filterCriteria.propertyTypes &&
      filterCriteria.propertyTypes.length > 0
    ) {
      filtered = filtered.filter((property) =>
        filterCriteria.propertyTypes.some((type) =>
          property.propertyType.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    if (filterCriteria.amenities && filterCriteria.amenities.length > 0) {
      filtered = filtered.filter((property) => {
        const allAmenities = [
          ...property.amenities.available,
          ...property.amenities.unavailable,
        ];
        return filterCriteria.amenities.every((amenity) =>
          allAmenities.some((propertyAmenity) =>
            propertyAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        );
      });
    }

    if (filterCriteria.bedrooms > 0) {
      filtered = filtered.filter((property) => {
        const bedCount = property.roomDetails.roomsAndBeds.bedrooms;
        return bedCount ? bedCount >= filterCriteria.bedrooms : false;
      });
    }

    if (filterCriteria.bathrooms > 0) {
      filtered = filtered.filter((property) => {
        const bathCount = property.roomDetails.roomsAndBeds.bathrooms;
        return bathCount ? bathCount >= filterCriteria.bathrooms : false;
      });
    }

    return filtered;
  };

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

  function filterData() {
    const filtered = filteredData
      .filter(
        (property) =>
          filters.destination === "" ||
          property.location.city === filters.destination
      )
      .filter(
        (property) =>
          filters.checkIn == "" ||
          isSameDateOnlyFirst(
            new Date(range[0].startDate),
            new Date(property.stayDates.check_in)
          )
      )
      .filter(
        (property) =>
          filters.checkOut == "" ||
          isSameDateOnlySecond(
            new Date(range[0].endDate),
            new Date(property.stayDates.check_out)
          )
      )
      .filter((property) => {
        const { adults, children, infants, pets } = filters.guests;
        return (
          property.maxGuests.adults >= adults &&
          property.maxGuests.children >= children &&
          property.maxGuests.infants >= infants &&
          property.maxGuests.pets >= pets
        );
      });

    setFilteredData(filtered);
    console.log("Filtered Data:", filteredData);
    // navigate("/filters");
  }

  function isSameDateOnlyFirst(a, b) {
    return (
      a.getFullYear() <= b.getFullYear() &&
      a.getMonth() <= b.getMonth() &&
      a.getDate() <= b.getDate()
    );
  }
  function isSameDateOnlySecond(a, b) {
    return (
      a.getFullYear() >= b.getFullYear() &&
      a.getMonth() >= b.getMonth() &&
      a.getDate() >= b.getDate()
    );
  }

  const [filterResults, setFilterResults] = useState(true);

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
        originalData,
        setOriginalData,
        applyFilters,
        setRange,
        range,
        filterData,
        isSameDateOnlyFirst,
        isSameDateOnlySecond,
        filterResults,
        setFilterResults,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersContext };
