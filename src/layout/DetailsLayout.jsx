import React from "react";
import { Outlet } from "react-router";
import DetailsHeader from "../components/DetailsHeader";
import Footer from "../components/Footer";

const DetailsLayout = () => {
  return (
    <>
      <DetailsHeader />
      <Outlet />;
      <Footer />
    </>
  );
};

export default DetailsLayout;
