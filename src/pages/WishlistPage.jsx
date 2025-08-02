import { useContext } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { Link } from "react-router";
import { Heart, Star } from "lucide-react";
import PropertyCard from "../components/PropertyCard";

const WishlistPage = () => {
  const { data } = useContext(PropertyContext);

  const likedIds = JSON.parse(localStorage.getItem("likedProperties")) || [];
  const likedProperties = data.filter((property) =>
    likedIds.includes(property.id)
  );
  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen mx-auto py-4 px-4 sm:px-5 lg:px-10 lg:py-8 pb-20">
      <div className="w-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold  ">Your Wishlist</h2>
        </div>

        <div className="flex flex-wrap md:flex-row md:items-center gap-4 ">
          {likedProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
