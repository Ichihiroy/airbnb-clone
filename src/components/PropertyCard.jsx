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
  <div className="group cursor-pointer">
    <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <button className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform">
        <Heart
          size={20}
          className={isFavorite ? "fill-red-500 text-red-500" : "text-white"}
        />
      </button>
      {badge && (
        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {badge}
        </div>
      )}
    </div>
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900 truncate">{title}</h3>
        <div className="flex items-center space-x-1">
          <Star size={12} className="fill-gray-900 text-gray-900" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{subtitle}</p>
      <p className="text-gray-900 font-medium">{price}</p>
    </div>
  </div>
);
export default PropertyCard;
