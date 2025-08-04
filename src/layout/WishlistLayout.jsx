import React from "react";
import { Link, Outlet } from "react-router";
import MobileBottomNav from "../components/MobileBottomNav";

const WishlistLayout = () => {
  return (
    <div>
      <div className=" items-center justify-start py-4 px-8 bg-zinc-50 shadow-lg  relative top-0 hidden md:flex">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-[120px]" alt="Logo" />
        </Link>
      </div>
      <Outlet />
      <MobileBottomNav wishlist={true} />
    </div>
  );
};

export default WishlistLayout;
