import { Heart, Star } from "lucide-react";
import React from "react";

const PropertyCard = ({
  images,
  type,
  price,
  rating,
  isFavorite = false,
  badge = null,
}) => (
  <div className="w-[180px] flex-shrink-0">
    <div className="relative w-full h-[180px] rounded-lg overflow-hidden mb-2">
      <img
        src={images[0]}
        alt={type}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <button className="absolute top-2 right-2 p-1">
        <Heart
          size={16}
          className={isFavorite ? "fill-red-500 text-red-500" : "text-white"}
        />
      </button>
      {badge && (
        <div className="absolute top-2 left-2 bg-white text-xs px-2 py-0.5 rounded-full font-medium shadow">
          {badge}
        </div>
      )}
    </div>
    <div className="text-sm space-y-0.5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium truncate text-gray-900">{type}</h3>
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
);

export default PropertyCard;
