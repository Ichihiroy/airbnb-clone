import { useContext, useState, useEffect } from "react";
import { FiltersContext } from "../context/FiltersContext";
import { PropertyContext } from "../context/PropertyContext";
import {
  X,
  Heart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Settings2,
} from "lucide-react";
import { Link, useOutletContext } from "react-router";

export default function FilterResults() {
  const { data } = useContext(PropertyContext);
  const {
    filteredData,
    setFilteredData,
    originalData,
    setOriginalData,
    applyFilters,
    filters,
    setFilters,
    setFilterResults,
  } = useContext(FiltersContext);

  const { showModal, setShowModal } = useOutletContext();

  const [tempFilters, setTempFilters] = useState({
    priceRange: [],
    propertyTypes: [],
    amenities: [],
    bedrooms: 0,
    bathrooms: 0,
    instantBook: false,
  });

  useEffect(() => {
    if (data && data.length > 0 && originalData.length === 0) {
      setOriginalData(data);
    }
  }, [data, originalData, setOriginalData]);

  useEffect(() => {
    if (showModal) {
      setTempFilters({
        priceRange: filters.priceRange || [],
        propertyTypes: filters.propertyTypes || [],
        amenities: filters.amenities || [],
        bedrooms: filters.bedrooms || 0,
        bathrooms: filters.bathrooms || 0,
        instantBook: filters.instantBook || false,
      });
    }
  }, [showModal, filters]);

  const propertyTypes = [
    "Condo",
    "Loft",
    "Apartment",
    "Cabin",
    "House",
    "Villa",
  ];

  const amenities = [
    "Kitchen",
    "Wifi",
    "Dedicated workspace",
    "Free washer – In unit",
    "Free dryer – In unit",
    "Bathtub",
    "Indoor fireplace: wood-burning",
    "Luggage dropoff allowed",
    "Heating",
    "Balcony",
    "Air conditioning",
    "TV",
    "Lock on bedroom door",
    "Carbon monoxide alarm",
  ];

  const handleFilterChange = (category, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handlePropertyTypeToggle = (type) => {
    setTempFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setTempFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const clearAllFilters = () => {
    setTempFilters({
      priceRange: [],
      propertyTypes: [],
      amenities: [],
      bedrooms: 0,
      bathrooms: 0,
      instantBook: false,
    });
  };

  const applyFiltersToData = () => {
    const newFilters = {
      ...filters,
      ...tempFilters,
    };
    setFilters(newFilters);

    const filtered = applyFilters(originalData, newFilters);
    setFilteredData(filtered);
    setShowModal(false);
  };

  const getFilteredCount = () => {
    if (!originalData || originalData.length === 0) return 0;

    const combinedFilters = {
      ...filters,
      ...tempFilters,
    };

    const tempFiltered = applyFilters(originalData, combinedFilters);
    return tempFiltered.length;
  };

  if (!filteredData || filteredData.length === 0) {
    setFilterResults(false);

    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50">
        <h2 className="text-2xl font-semibold">No results were found</h2>
      </div>
    );
  }

  setFilterResults(true);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen mx-auto py-4 px-4 sm:px-5 lg:px-10 lg:py-8 relative">
      <div className="w-full lg:w-1/2 overflow-y-auto md:py-20 lg:py-18">
        <div className="justify-between items-center mb-4 sm:mb-6 hidden md:block">
          <h2 className="text-lg sm:text-xl font-semibold  ">
            {filteredData.length} homes
          </h2>
        </div>
        <div className="justify-between items-center mb-4 sm:mb-6 flex md:hidden shadow-lg absolute top-0 left-0 right-0 bg-gray-50 z-10 px-6 py-3 rounded-b-lg ">
          <Link to="/">
            <ArrowLeft size={18} />
          </Link>
          <div className="bg-white w-[70%] text-center text-sm shadow-lg rounded-full flex items-center justify-center px-4 py-3  ">
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm ">
                {filters.destination || "Homes Nearby"}
              </p>
              <p className="text-xs text-gray-500">
                <span>
                  {filters.checkIn
                    ? filters.checkIn.slice(0, 3) +
                      " " +
                      filters.checkIn.slice(-2) +
                      " - " +
                      filters.checkOut.slice(-2)
                    : "Any week"}
                </span>
                {" •"}
                <span>
                  {" "}
                  {filters.guests.adults ||
                  filters.guests.children ||
                  filters.guests.infants ||
                  filters.guests.pets
                    ? Object.entries(filters.guests)
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
                    : "Add guests"}
                </span>
              </p>
            </div>
          </div>
          <Settings2 onClick={() => setShowModal(true)} size={18} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 pt-24 md:pt-0">
          {filteredData.map((listing) => (
            <Link to={`/details/${listing.id}`} key={listing.id}>
              <div className="w-full flex-shrink-0 relative group">
                <div className="relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden mb-2 sm:mb-3">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute top-2 right-2 sm:right-3 p-1 cursor-pointer">
                    <Heart
                      size={20}
                      className="sm:w-6 sm:h-6 text-white fill-gray-500/50 hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                  {listing.rating.score > 4.9 ? (
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gray-100 border border-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium shadow">
                      Guest Favorite
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-sm space-y-0.5 sm:space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate text-gray-900 text-sm sm:text-base">
                      {listing.typeOfPlace} in {listing.location.city}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {listing.price.total} {listing.price.currency} for{" "}
                      {listing.price.nights} nights
                    </p>
                    <Star
                      size={8}
                      className="sm:w-2.5 sm:h-2.5 fill-gray-500 text-gray-500"
                    />
                    <span className="text-xs text-gray-500">
                      {listing.rating.score}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full h-[80vh] lg:w-1/2 mt-6 lg:mt-0 lg:ps-6 hidden lg:block sticky top-25">
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?1m12!1m3!1d3030.12345!2d49.8671!3d40.4093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1"
          className="w-full h-64 lg:h-full rounded-3xl border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/30 ">
          <div className="w-full md:max-w-xl mx-auto rounded-t-4xl bg-white md:rounded-4xl shadow relative overflow-hidden">
            <h2 className="text-md font-semibold mb-4 text-center border-b border-gray-300 py-5">
              Filters
            </h2>
            <button className="absolute top-4.5 right-4 text-black hover:bg-gray-100 p-1 rounded-full transition-colors">
              <X size={20} onClick={() => setShowModal(false)} />
            </button>

            <div className="px-6 space-y-4 h-[70vh] overflow-scroll">
              <div className="w-full ">
                <h3 className="text-lg font-medium mb-3">Type of place</h3>
                <div className="flex items-center overflow-hidden border border-gray-300 rounded-xl divide-x divide-gray-100">
                  <div className="px-6 py-2  rounded-xl m-1 w-1/3 text-center border-black border-2 bg-gray-100">
                    <span className="font-medium text-black">Any type</span>
                  </div>
                  <div className="px-6 py-2 hover:bg-gray-100 cursor-pointer m-1 text-center w-1/3 hover:rounded-xl">
                    <span className="text-black">Room</span>
                  </div>
                  <div className="px-6 py-2 hover:bg-gray-100  rounded-xl cursor-pointer text-center w-1/3">
                    <span className="text-black">Entire home</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-1">Price range</h2>
                <p className="mb-4 text-xs text-zinc-800">
                  Trip price, includes all fees
                </p>
                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-zinc-600 block mb-1 ml-5.5">
                      Minimum
                    </label>
                    <input
                      type="number"
                      value={tempFilters.priceRange[0]}
                      onChange={(e) =>
                        handleFilterChange("priceRange", [
                          parseInt(e.target.value),
                          tempFilters.priceRange[1],
                        ])
                      }
                      placeholder="50$"
                      className="w-[100px] px-3 py-2 border rounded-full border-gray-300  placeholder:text-black placeholder:text-sm placeholder:text-center"
                    />
                  </div>
                  <div className="flex-1 flex items-end flex-col">
                    <label className="text-xs mr-5.5 text-zinc-600 block mb-1">
                      Maximum
                    </label>
                    <input
                      type="number"
                      value={tempFilters.priceRange[1]}
                      onChange={(e) =>
                        handleFilterChange("priceRange", [
                          tempFilters.priceRange[0],
                          parseInt(e.target.value),
                        ])
                      }
                      placeholder="1000$+"
                      className="w-[100px] px-3 py-2 border rounded-full border-gray-300 placeholder:text-black placeholder:text-sm placeholder:text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {amenities.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleAmenityToggle(item)}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm transition-colors ${
                        tempFilters.amenities.includes(item)
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Property type</h3>
                <div className="flex flex-wrap gap-3">
                  {propertyTypes.map((item) => (
                    <button
                      key={item}
                      onClick={() => handlePropertyTypeToggle(item)}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm transition-colors ${
                        tempFilters.propertyTypes.includes(item)
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium mb-4">Rooms and beds</h2>

                <div className="flex justify-between items-center py-2">
                  <span>Bedrooms</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleFilterChange(
                          "bedrooms",
                          Math.max(0, tempFilters.bedrooms - 1)
                        )
                      }
                      className="p-2 rounded-full border text-gray-500 border-gray-300"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center">
                      {tempFilters.bedrooms === 0
                        ? "Any"
                        : tempFilters.bedrooms}
                    </span>
                    <button
                      onClick={() =>
                        handleFilterChange("bedrooms", tempFilters.bedrooms + 1)
                      }
                      className="p-2 rounded-full border text-gray-500 border-gray-300"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span>Bathrooms</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleFilterChange(
                          "bathrooms",
                          Math.max(0, tempFilters.bathrooms - 1)
                        )
                      }
                      className="p-2 rounded-full border text-gray-500 border-gray-300"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center">
                      {tempFilters.bathrooms === 0
                        ? "Any"
                        : tempFilters.bathrooms}
                    </span>
                    <button
                      onClick={() =>
                        handleFilterChange(
                          "bathrooms",
                          tempFilters.bathrooms + 1
                        )
                      }
                      className="p-2 rounded-full border text-gray-500 border-gray-300"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Standout stays */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Standout stays</h3>
                <div className="flex gap-4">
                  <div className="flex-1 border border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                    <h4 className="font-semibold mb-1">Guest favorite</h4>
                    <p className="text-sm text-gray-600">
                      The most loved homes on Airbnb
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pb-6">
                <h2 className="text-lg font-medium">Accessibility features</h2>

                {/* Guest entrance and parking */}
                <div>
                  <h3 className="font-medium mb-2">
                    Guest entrance and parking
                  </h3>
                  <div className="space-y-2 text-sm ml-1">
                    <label className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="accent-black scale-150"
                      />
                      Step-free access
                    </label>
                    <label className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="accent-black scale-150"
                      />
                      Disabled parking spot
                    </label>
                    <label className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="accent-black scale-150"
                      />
                      Guest entrance wider than 32 inches
                    </label>
                  </div>
                </div>

                {/* Bedroom */}
                <div>
                  <h3 className="font-medium mb-2">Bedroom</h3>
                  <div className="space-y-2 text-sm ml-1">
                    <label className="flex items-center gap-4 ">
                      <input
                        type="checkbox"
                        className="accent-black scale-150"
                      />
                      Step-free bedroom access
                    </label>
                    <label className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="accent-black scale-150 "
                      />
                      Bedroom entrance wider than 32 inches
                    </label>
                  </div>
                </div>

                {/* Bathroom */}
                <div>
                  <h3 className="font-medium mb-2">Bathroom</h3>
                  <div className="space-y-2 text-sm ml-1">
                    <label className="flex items-center gap-4 ">
                      <input
                        type="checkbox"
                        className="accent-black scale-150"
                      />
                      Step-free bathroom access
                    </label>
                    <label className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="accent-black scale-150"
                      />
                      Bathroom entrance wider than 32 inches
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-gray-300 shadow-2xl px-6 py-4">
              <button
                onClick={clearAllFilters}
                className="text-lg text-gray-black/90 hover:text-black"
              >
                Clear all
              </button>
              <button
                onClick={applyFiltersToData}
                className="bg-black/90 hover:bg-black text-white px-5 py-2 rounded-md text-lg font-medium"
              >
                Show {getFilteredCount()} places
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
