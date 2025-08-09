import React, { createContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [reserveDetails, setReserveDetails] = useState([]);

  return (
    <BookingContext.Provider value={{ reserveDetails, setReserveDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext };
