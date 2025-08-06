import { Outlet, ScrollRestoration } from "react-router";
import MobileNavbar from "../components/MobileNavbar";

const AuthLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <MobileNavbar />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
