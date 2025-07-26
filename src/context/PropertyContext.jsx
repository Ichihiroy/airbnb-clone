import React, { createContext, useEffect, useState } from "react";
import { getAllProperties } from "../services/propertyServices";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [destination, setDestination] = useState(new Set());

  useEffect(() => {
    getAllProperties().then((properties) => {
      setData(properties);
    });

    getAllProperties().then((properties) => {
      setDestination(
        new Set(properties.map((property) => property.location.country))
      );
    });
  }, []);

  return (
    <PropertyContext.Provider value={{ data, destination }}>
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext };
