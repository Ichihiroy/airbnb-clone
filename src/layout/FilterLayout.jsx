import { Outlet } from "react-router";
import DetailsHeader from "../components/DetailsHeader";
import Footer from "../components/Footer";
import { useState } from "react";
import MobileBottomNav from "../components/MobileBottomNav";

const FilterLayout = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DetailsHeader filters={"filters"} setShowModal={setShowModal} />
      <Outlet context={{ showModal, setShowModal }} />
      <Footer filters={"filters"} />
      <MobileBottomNav />
    </>
  );
};

export default FilterLayout;
