import { Search } from "lucide-react";

const MobileSearch = () => (
  <div className="lg:hidden bg-white border border-gray-300 rounded-full shadow-sm mx-4 mb-8">
    <div className="flex items-center px-4 py-3">
      <Search size={20} className="text-gray-600 mr-3" />
      <span className="text-gray-600">Start your search</span>
    </div>
  </div>
);

export default MobileSearch;
