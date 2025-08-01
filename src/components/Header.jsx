import { Link } from "react-router";
import MobileSearch from "./MobileSearch";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import { Globe, Menu, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileSearchBar from "./MobileSearchBar";

const Header = () => {
  const [showCompactHeader, setShowCompactHeader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  return (
    <header className="bg-zinc-100 w-full md:border-b border-gray-200 fixed top-0 z-50">
      <div className="bg-zinc-100 sticky top-0 z-50 hidden md:block container mx-auto">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 relative">
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
                <div className="bg-white shadow-md cursor-pointer rounded-full flex items-center justify-between gap-5 px-4 lg:ml-30 py-3  border border-gray-300 relative">
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
              <span className="hidden lg:block font-normal cursor-pointer">
                Become a host
              </span>

              <div className="flex items-center space-x-2 cursor-pointer bg-zinc-200 rounded-full p-2 hover:shadow-md transition-shadow">
                <Globe size={18} />
              </div>

              <div
                onClick={() => setShowModal(true)}
                className="flex items-center bg-zinc-200 space-x-2 cursor-pointer  rounded-full p-2 hover:shadow-md transition-shadow"
              >
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

        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="right-6 top-18 z-50 absolute w-[250px]"
            ref={containerRef}
          >
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full flex flex-col items-start">
              <h2 className="text-sm mb-4 border-b font-medium border-gray-300 pb-3 w-full hover:underline cursor-pointer">
                Help Center
              </h2>
              <div className="border-b border-gray-300 pb-3 w-full mb-4">
                <h4 className="font-medium text-sm hover:underline cursor-pointer pb-1">
                  Become a host
                </h4>
                <p className="text-xs text-gray-500">
                  It's easy to start hosting and earn extra income.
                </p>
              </div>
              <ul className="border-b border-gray-300 pb-3 w-full mb-4 text-sm space-y-2 cursor-pointer ">
                <li className="hover:underline">Refer a host</li>
                <li className="hover:underline">Find a co-host</li>
                <li className="hover:underline">Gift cards</li>
              </ul>
              <Link to="auth/login">
                <button className="text-sm hover:underline cursor-pointer">
                  Log in or sign up
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <div className="pt-4 md:hidden shadow-lg">
        <MobileSearch setIsOpen={setIsOpen} />
        <div className="flex md:hidden justify-center items-center">
          <Navigation />
        </div>
      </div>

      {isOpen && <MobileSearchBar setIsOpen={setIsOpen} />}
    </header>
  );
};
export default Header;
