import PropertySection from "../components/PropertySection";
import { useContext } from "react";
import Loading from "./Loading";
import { PropertyContext } from "../context/PropertyContext";

const Main = () => {
  const { data } = useContext(PropertyContext);

  if (!data.length) {
    return <Loading />;
  }

  return (
    <main className="bg-white  container mx-auto mt-45">
      <div className="max-w-9xl mx-auto  md:px-6 lg:px-8 py-8">
        <PropertySection title="Popular homes" properties={data} />
        <PropertySection
          title="Stay in Baku"
          properties={data.filter(
            (item) => item.location.country === "Azerbaijan"
          )}
        />
      </div>
    </main>
  );
};

export default Main;
