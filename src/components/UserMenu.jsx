import { Globe, Menu, User } from "lucide-react";

const UserMenu = () => (
  <div className="flex items-center space-x-4">
    <span className="hidden lg:block font-medium">Become a host</span>

    <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow">
      <Globe size={16} />
    </div>

    <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow">
      <Menu size={16} />
    </div>
  </div>
);

export default UserMenu;
