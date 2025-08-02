import React from "react";
import { Outlet } from "react-router";

const ProfileLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
