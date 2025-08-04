import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const MobileNavbar = () => {
  return (
    <>
      <div className="flex items-center justify-start p-4 bg-white shadow-md md:hidden">
        <Link to="/" className="flex items-center gap-3">
          <ArrowLeft /> Return to homepage
        </Link>
      </div>
      <div className=" items-center justify-start py-4 px-8 bg-zinc-50 shadow-lg  relative top-0 hidden md:flex">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-[120px]" alt="Logo" />
        </Link>
      </div>
    </>
  );
};

export default MobileNavbar;
