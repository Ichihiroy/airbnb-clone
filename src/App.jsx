import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";

const App = () => {
  return (
    <div className="min-h-screen  ">
      <Header />
      <Main />
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default App;
