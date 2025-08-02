import { Heart, Star } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const PropertyCard = ({
  id,
  images,
  type,
  typeOfPlace,
  price,
  rating,
  location,
}) => {
  const [likedProperties, setLikedProperties] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedProperties")) || [];
    setLikedProperties(stored);
  }, []);

  function handleLikes(id) {
    if (!user) {
      localStorage.setItem("likedProperties", JSON.stringify([]));
      setLikedProperties([]);
      navigate("/auth/login");
      toast.error("Please log in to like properties");
      return;
    }

    const currentLiked =
      JSON.parse(localStorage.getItem("likedProperties")) || [];
    let updatedLiked;

    if (currentLiked.includes(id)) {
      updatedLiked = currentLiked.filter((propertyId) => propertyId !== id);
    } else {
      updatedLiked = [...currentLiked, id];
    }

    localStorage.setItem("likedProperties", JSON.stringify(updatedLiked));
    setLikedProperties(updatedLiked);
  }

  return (
    <Link to={`/details/${id}`}>
      <div className="w-[180px] flex-shrink-0 relative">
        <div className="relative w-full h-[180px] rounded-3xl overflow-hidden mb-2">
          <img
            src={images[0]}
            alt={type}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLikes(id);
            }}
            className="absolute top-2 right-3 p-1 cursor-pointer"
          >
            <Heart
              size={24}
              className={
                likedProperties.includes(id)
                  ? "fill-red-500 text-red-500"
                  : "text-white fill-gray-500/50 hover:scale-110 transition-transform duration-300"
              }
            />
          </button>
          {rating.score > 4.9 ? (
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
              {typeOfPlace} in {location.city}
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            <p className="text-gray-500">
              {price.total} {price.currency} for {price.nights} nights
            </p>
            <Star size={10} className="fill-gray-500 text-gray-500" />
            <span className="text-xs text-gray-500">{rating.score}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
