import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header />
      <Main />
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default App;
