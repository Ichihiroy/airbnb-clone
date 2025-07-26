import React, { createContext, useEffect, useState } from "react";
import { getAllProperties } from "../services/propertyServices";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllProperties().then((properties) => {
      setData(properties);
    });
  }, []);

  return (
    <PropertyContext.Provider value={{ data }}>
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext };
