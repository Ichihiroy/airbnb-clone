import { Outlet } from "react-router";
import DetailsHeader from "../components/DetailsHeader";
import Footer from "../components/Footer";

const FilterLayout = () => {
  return (
    <>
      <DetailsHeader filters={"filters"} />
      <Outlet />
      <Footer filters={"filters"} />
    </>
  );
};

export default FilterLayout;
