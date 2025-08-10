import { Link, Outlet, ScrollRestoration } from "react-router";
import MobileBottomNav from "../components/MobileBottomNav";

const WishlistLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <div className=" items-center justify-start py-4 px-10  relative top-0 hidden md:flex">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" className="w-[100px]" alt="Logo" />
        </Link>
      </div>

      <Outlet />
      <MobileBottomNav wishlist={true} />
    </div>
  );
};

export default WishlistLayout;
