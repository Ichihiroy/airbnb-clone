import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";
import { Outlet, ScrollRestoration } from "react-router";

const App = () => {
  return (
    <div className="min-h-screen">
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
      <MobileBottomNav explore={true} />
    </div>
  );
};

export default App;
