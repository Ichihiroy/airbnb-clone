import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";
import { X, Heart, Star, SlidersHorizontal, Minus, Plus } from "lucide-react";
import { Link, useOutletContext } from "react-router";

export default function FilterResults() {
  const { filteredData } = useContext(FiltersContext);
  const { showModal, setShowModal } = useOutletContext();

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen mx-auto py-4 px-4 sm:px-5 lg:px-10 lg:py-8">
      <div className="w-full lg:w-1/2 overflow-y-auto md:py-20 lg:py-18">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold  ">
            {filteredData.length} homes
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 ">
          <div className="max-w-xl mx-auto  bg-white rounded-4xl shadow relative">
            <h2 className="text-md font-semibold mb-4 text-center border-b border-gray-300 py-5">
              Filters
            </h2>
            <button className="absolute top-4.5 right-4 text-black hover:bg-gray-100 p-1 rounded-full transition-colors">
              <X size={20} onClick={() => setShowModal(false)} />
            </button>

            <div className="px-6 space-y-4 h-[70vh] overflow-scroll">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Wifi",
                    "TV",
                    "Beachfront",
                    "Pool",
                    "Waterfront",
                    "Hot tub",
                  ].map((item) => (
                    <button
                      key={item}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
                <button className="text-sm text-gray-700 mt-2 hover:underline">
                  Show more
                </button>
              </div>

              {/* Booking options */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Booking options</h3>
                <div className="flex flex-wrap gap-3">
                  {["Instant Book", "Self check-in", "Allows pets"].map(
                    (item) => (
                      <button
                        key={item}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                      >
                        <span>{item}</span>
                      </button>
                    )
                  )}
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
                  <div className="flex-1 border border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                    <h4 className="font-semibold mb-1">Luxe</h4>
                    <p className="text-sm text-gray-600">
                      Luxury homes with elevated design
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Standout stays</h3>
                <div className="flex gap-4">
                  <div className="flex-1 border border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                    <h4 className="font-semibold mb-1">Guest favorite</h4>
                    <p className="text-sm text-gray-600">
                      The most loved homes on Airbnb
                    </p>
                  </div>
                  <div className="flex-1 border border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                    <h4 className="font-semibold mb-1">Luxe</h4>
                    <p className="text-sm text-gray-600">
                      Luxury homes with elevated design
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Standout stays</h3>
                <div className="flex gap-4">
                  <div className="flex-1 border border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                    <h4 className="font-semibold mb-1">Guest favorite</h4>
                    <p className="text-sm text-gray-600">
                      The most loved homes on Airbnb
                    </p>
                  </div>
                  <div className="flex-1 border border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                    <h4 className="font-semibold mb-1">Luxe</h4>
                    <p className="text-sm text-gray-600">
                      Luxury homes with elevated design
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-gray-300 shadow-2xl px-6 py-4">
              <button className="text-lg text-gray-black/90 hover:text-black">
                Clear all
              </button>
              <button className="bg-black/90 hover:bg-black text-white px-5 py-2 rounded-md text-lg font-medium">
                Show 1,000+ places
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
