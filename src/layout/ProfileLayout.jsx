import React from "react";
import { Outlet } from "react-router";
import MobileBottomNav from "../components/MobileBottomNav";

const ProfileLayout = () => {
  return (
    <div>
      <Outlet />
      <MobileBottomNav profile={true} />
    </div>
  );
};

export default ProfileLayout;
