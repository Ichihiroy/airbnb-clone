import { Link, Outlet, ScrollRestoration } from "react-router";

const BookingLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <div className=" items-center justify-start py-4 px-8  relative top-0 hidden md:flex">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-[100px]" alt="Logo" />
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default BookingLayout;
