import { Heart, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

// const userData = JSON.parse(localStorage.getItem("userData"));

const MobileBottomNav = ({ profile, explore, wishlist }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserData(null);
      }
    }

    const handleUserLogin = (event) => {
      setUserData(event.detail);
    };

    const handleUserLogout = () => {
      setUserData(null);
    };

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("userData");
      if (updatedUser) {
        try {
          setUserData(JSON.parse(updatedUser));
        } catch (error) {
          console.error("Error parsing updated user data:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    };

    // Add event listeners
    window.addEventListener("userLogin", handleUserLogin);
    window.addEventListener("userLogout", handleUserLogout);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("userLogin", handleUserLogin);
      window.removeEventListener("userLogout", handleUserLogout);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
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
            to={userData ? "/wishlist" : "/auth/login"}
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
            <Link to="/auth/login" className="flex flex-col items-center">
              <User size={20} />
              <span className="text-xs mt-1">Log in</span>
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};
export default MobileBottomNav;
