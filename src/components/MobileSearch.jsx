import { Search } from "lucide-react";

const MobileSearch = ({ setIsOpen }) => (
  <div className="md:hidden bg-white border-gray-300 rounded-full shadow-lg mx-4 mb-4">
    <div
      className="flex items-center justify-center px-4 py-4"
      onClick={() => setIsOpen(true)}
    >
      <Search size={12} strokeWidth={3} className="mr-3" />
      <span className="text-sm">Start your search</span>
    </div>
  </div>
);

export default MobileSearch;
