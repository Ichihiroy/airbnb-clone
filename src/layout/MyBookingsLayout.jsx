import { Link, Outlet, ScrollRestoration } from "react-router";

const MyBookingsLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className="max-w-6xl mx-auto px-6 pt-4 items-center justify-start  relative top-0 hidden md:flex">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-[100px]" alt="Logo" />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MyBookingsLayout;
