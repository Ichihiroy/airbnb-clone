import PropertySection from "../components/PropertySection";
import { useEffect, useState } from "react";
import { getAllProperties } from "../services/propertyServices";

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllProperties().then((properties) => {
      setData(properties);
    });
  }, []);

  return (
    <main className="bg-white  container mx-auto">
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
