import { Heart, Search, User } from "lucide-react";

const MobileBottomNav = () => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
    <div className="grid grid-cols-3 py-2">
      <button className="flex flex-col items-center py-2 text-red-500">
        <Search size={20} />
        <span className="text-xs mt-1">Explore</span>
      </button>
      <button className="flex flex-col items-center py-2 text-gray-600">
        <Heart size={20} />
        <span className="text-xs mt-1">Wishlists</span>
      </button>
      <button className="flex flex-col items-center py-2 text-gray-600">
        <User size={20} />
        <span className="text-xs mt-1">Log in</span>
      </button>
    </div>
  </div>
);
export default MobileBottomNav;
