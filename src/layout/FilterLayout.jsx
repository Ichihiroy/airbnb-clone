import { Outlet } from "react-router";
import DetailsHeader from "../components/DetailsHeader";
import Footer from "../components/Footer";

const FilterLayout = () => {
  return (
    <>
      <DetailsHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default FilterLayout;
