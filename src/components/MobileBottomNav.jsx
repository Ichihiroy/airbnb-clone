import { Heart, Search, User } from "lucide-react";
import { Link } from "react-router";

const userData = JSON.parse(localStorage.getItem("userData"));

const MobileBottomNav = ({ profile, explore, wishlist }) => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
    <div className="grid grid-cols-3 py-2">
      <button
        className={`flex flex-col items-center py-2 ${
          explore ? "text-red-500" : "text-gray-600"
        }`}
      >
        <Link to="/" className="flex flex-col items-center">
          <Search size={20} />
          <span className="text-xs mt-1">Explore</span>
        </Link>
      </button>
      <button
        className={`flex flex-col items-center py-2 ${
          wishlist ? "text-red-500" : "text-gray-600"
        }`}
      >
        <Link
          to={userData ? "/wishlist" : "auth/login"}
          className="flex flex-col items-center"
        >
          <Heart size={20} />
          <span className="text-xs mt-1">Wishlists</span>
        </Link>
      </button>
      <button
        className={`flex flex-col items-center py-2 ${
          profile ? "text-red-500" : "text-gray-600"
        }`}
      >
        {userData ? (
          <Link to={`/profile`} className="flex flex-col items-center">
            <User size={20} />
            <span className="text-xs mt-1">{userData.fullname}</span>
          </Link>
        ) : (
          <Link to="auth/login" className="flex flex-col items-center">
            <User size={20} />
            <span className="text-xs mt-1">Log in</span>
          </Link>
        )}
      </button>
    </div>
  </div>
);
export default MobileBottomNav;
