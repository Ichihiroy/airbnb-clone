import React from "react";
import { Outlet } from "react-router";
import MobileBottomNav from "../components/MobileBottomNav";

const WishlistLayout = () => {
  return (
    <div>
      <Outlet />
      <MobileBottomNav wishlist={true} />
    </div>
  );
};

export default WishlistLayout;
