import MobileSearch from "./MobileSearch";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import { Globe, Menu } from "lucide-react";

const Header = () => (
  <header className="bg-zinc-100 w-full">
    <div className="bg-zinc-100 border-b border-gray-200 sticky top-0 z-50 hidden lg:block container mx-auto">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center w-25">
            <img src="./logo.png" alt="" />
          </div>
          <Navigation />
          <div className="flex items-center space-x-4">
            <span className="hidden lg:block font-normal">Become a host</span>

            <div className="flex items-center space-x-2 bg-zinc-200 rounded-full p-2 hover:shadow-md transition-shadow">
              <Globe size={18} />
            </div>

            <div className="flex items-center bg-zinc-200 space-x-2  rounded-full p-2 hover:shadow-md transition-shadow">
              <Menu size={18} />
            </div>
          </div>
        </div>
        <div className="pb-4 lg:hidden">
          <SearchBar isMobile={true} />
        </div>
      </div>
      <div className="hidden lg:block max-w-4xl mx-auto px-4 pb-4">
        <SearchBar />
      </div>
    </div>

    <div className="mt-4 lg:hidden shadow-sm">
      <MobileSearch />
      <div className="flex lg:hidden justify-center items-center mb-6 ">
        <Navigation />
      </div>
    </div>
  </header>
);
export default Header;
