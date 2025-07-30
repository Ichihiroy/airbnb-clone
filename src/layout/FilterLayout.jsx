import { Outlet } from "react-router";
import DetailsHeader from "../components/DetailsHeader";
import Footer from "../components/Footer";
import { useState } from "react";

const FilterLayout = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DetailsHeader filters={"filters"} setShowModal={setShowModal} />
      <Outlet context={{ showModal, setShowModal }} />
      <Footer filters={"filters"} />
    </>
  );
};

export default FilterLayout;
