import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import { Outlet } from "react-router";
import { PropertyProvider } from "../context/PropertyContext";
import { FiltersProvider } from "../context/FiltersContext";

const App = () => {
  return (
    <div className="min-h-screen  ">
      <FiltersProvider>
        <PropertyProvider>
          <Header />
          <Outlet />
          <Footer />
          <MobileBottomNav />
        </PropertyProvider>
      </FiltersProvider>
    </div>
  );
};

export default App;
