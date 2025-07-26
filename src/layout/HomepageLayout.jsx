import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import { Outlet } from "react-router";
import { PropertyProvider } from "../context/PropertyContext";

const App = () => {
  return (
    <div className="min-h-screen  ">
      <PropertyProvider>
        <Header />
        <Outlet />
        <Footer />
        <MobileBottomNav />
      </PropertyProvider>
    </div>
  );
};

export default App;
