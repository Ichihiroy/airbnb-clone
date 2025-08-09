import { Outlet, ScrollRestoration } from "react-router";
import DetailsHeader from "../components/DetailsHeader";
import Footer from "../components/Footer";

const DetailsLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <DetailsHeader />
      <Outlet />
      <Footer filters={true} />
    </>
  );
};

export default DetailsLayout;
