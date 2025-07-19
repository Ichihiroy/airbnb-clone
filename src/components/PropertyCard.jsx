import { Heart, Star } from "lucide-react";
import React from "react";

const PropertyCard = ({
  image,
  title,
  subtitle,
  price,
  rating,
  isFavorite = false,
  badge = null,
}) => (
  <div className="w-[180px] flex-shrink-0">
    <div className="relative w-full h-[180px] rounded-lg overflow-hidden mb-2">
      <img
        src={image}
        alt={title}
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
        <h3 className="font-medium truncate text-gray-900">{title}</h3>
        <div className="flex items-center space-x-1">
          <Star size={10} className="fill-gray-900 text-gray-900" />
          <span className="text-xs">{rating}</span>
        </div>
      </div>
      <p className="text-gray-500">{subtitle}</p>
      <p className="text-gray-900 font-semibold">{price}</p>
    </div>
  </div>
);

export default PropertyCard;
