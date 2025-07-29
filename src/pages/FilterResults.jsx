import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";
import { X, Heart, Star } from "lucide-react";
import { Link } from "react-router";

export default function FilterResults() {
  const { filteredData } = useContext(FiltersContext);
  console.log("Filtered Data:", filteredData);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen mx-auto py-4 px-4 sm:px-5 lg:px-10 lg:py-8">
      <div className="w-full lg:w-1/2 overflow-y-auto md:py-20 lg:py-18">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold  ">
            {filteredData.length} homes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
    </div>
  );
}
