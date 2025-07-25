import { Link } from "react-router";
import MobileSearch from "./MobileSearch";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import { Globe, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [showCompactHeader, setShowCompactHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowCompactHeader(true);
      } else {
        setShowCompactHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-zinc-100 w-full md:border-b border-gray-200 fixed top-0 z-50">
      <div className="bg-zinc-100 sticky top-0 z-50 hidden md:block container mx-auto">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <div className="flex items-center w-25">
                <img src="/logo.png" alt="" />
              </div>
            </Link>

            {showCompactHeader ? (
              <motion.div
                key="header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white shadow-md rounded-full flex items-center justify-between gap-5 px-4 lg:ml-30 py-3  border border-gray-300 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl">
                    🏠
                  </div>
                  <div className="ps-9 text-sm">Anywhere</div>
                  <div className=" px-3 border-r border-l text-sm border-gray-300 ">
                    Any week
                  </div>
                  <div className="pe-9 text-sm ">
                    <p>Add guests </p>
                  </div>
                  <div className="bg-[#FF385C] rounded-full p-2 absolute right-2 top-1/2 -translate-y-1/2">
                    <Search size={14} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Navigation />
              </motion.div>
            )}

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
          <div className="pb-4 md:hidden">
            <SearchBar />
          </div>
        </div>
        <div
          className={`hidden ${
            showCompactHeader ? "md:hidden" : "md:block"
          } max-w-4xl mx-auto px-4 pb-4`}
        >
          <AnimatePresence mode="wait">
            {!showCompactHeader ? (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SearchBar setShowCompactHeader={setShowCompactHeader} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-4 md:hidden shadow-lg">
        <MobileSearch />
        <div className="flex md:hidden justify-center items-center">
          <Navigation />
        </div>
      </div>
    </header>
  );
};
export default Header;
