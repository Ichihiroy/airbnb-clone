import { Link, Outlet } from "react-router";
import MobileBottomNav from "../components/MobileBottomNav";
import DetailsHeader from "../components/DetailsHeader";

const WishlistLayout = () => {
  return (
    <div>
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
