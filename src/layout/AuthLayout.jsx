import React from "react";
import { Outlet } from "react-router";
import MobileNavbar from "../components/MobileNavbar";

const AuthLayout = () => {
  return (
    <div>
      <MobileNavbar />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
