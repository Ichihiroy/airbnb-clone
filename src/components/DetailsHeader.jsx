import { Globe, Menu, Search, Settings2 } from "lucide-react";
import { Link } from "react-router";

const DetailsHeader = ({ filters, setShowModal }) => {
  return (
    <header
      className={`bg-white  md:border-b border-gray-200  mx-auto  ${
        filters ? "fixed top-0 left-0 right-0 z-50" : ""
      }`}
    >
      <div
        className={`bg-white sticky top-0 z-50 hidden md:block mx-auto ${
          !filters ? "container max-w-screen-xl  lg:px-8" : "lg:px-4"
        }`}
      >
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-20 `}>
            <Link to="/" className="flex items-center">
              <div className="flex items-center w-25">
                <img src="/logo.png" alt="" />
              </div>
            </Link>

            <div className="flex items-center gap-4 lg:gap-6">
              <div
                className={`bg-white shadow-md rounded-full flex items-center justify-between gap-5 px-4 lg:ml-30  py-3  border border-gray-300 relative cursor-pointer`}
              >
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

              {filters ? (
                <button
                  className="rounded-full px-4 py-2 border  border-gray-300 text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowModal(true)}
                >
                  <Settings2 size={15} />
                  Filters
                </button>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-center space-x-4">
              {!filters && (
                <span className="hidden lg:block font-normal cursor-pointer">
                  Become a host
                </span>
              )}

              <div className="flex items-center space-x-2 cursor-pointer bg-zinc-200 rounded-full p-2 hover:shadow-md transition-shadow">
                <Globe size={18} />
              </div>

              <div className="flex items-center bg-zinc-200 space-x-2 cursor-pointer rounded-full p-2 hover:shadow-md transition-shadow">
                <Menu size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DetailsHeader;
