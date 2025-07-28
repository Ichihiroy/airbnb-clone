import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";
import { X, Heart, Star } from "lucide-react";
import { Link } from "react-router";

export default function FilterResults() {
  const { filteredData } = useContext(FiltersContext);
  console.log("Filtered Data:", filteredData);

  return (
    <div className="flex h-full min-h-screen max-w-screen-xl mx-auto py-4 px-5 lg:px-14 lg:py-8 `">
      <div className="w-2/3  overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{filteredData.length} homes</h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {filteredData.map((listing) => (
            <Link to={`/details/${listing.id}`} key={listing.id}>
              <div className="w-[230px] flex-shrink-0 relative">
                <div className="relative w-full h-[215px] rounded-3xl overflow-hidden mb-2">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute top-2 right-3 p-1 cursor-pointer">
                    <Heart
                      size={24}
                      className={
                        // isFavorite
                        //   ? "fill-red-500 text-red-500"
                        //   :
                        "text-white fill-gray-500/50 hover:scale-120 transition-transform duration-300"
                      }
                    />
                  </button>
                  {listing.rating.score > 4.9 ? (
                    <div className="absolute top-3 left-3 bg-gray-100 border border-white text-xs px-2 py-0.5 rounded-full font-medium shadow">
                      Guest Favorite
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-sm space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate text-gray-900">
                      {listing.typeOfPlace} in {listing.location.city}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <p className="text-gray-500">
                      {listing.price.total} {listing.price.currency} for{" "}
                      {listing.price.nights} nights
                    </p>
                    <Star size={10} className="fill-gray-500 text-gray-500" />
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

      <div className="w-1/3 p-6">
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3030.12345!2d49.8671!3d40.4093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1"
          className="w-full h-full rounded-lg border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
