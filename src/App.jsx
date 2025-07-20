import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="min-h-screen  ">
      <Header />
      <Outlet />
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default App;
