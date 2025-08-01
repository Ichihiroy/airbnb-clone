import React, { useContext, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FiltersContext } from "../context/FiltersContext";

const AirbnbDatePicker = ({ setFilters, filters, months }) => {
  const { range, setRange } = useContext(FiltersContext);

  useEffect(() => {
    const formatDate = (dateObj) => {
      if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return null;

      return dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    };

    const formattedStart = formatDate(range[0].startDate);
    const formattedEnd = formatDate(range[0].endDate);

    if (formattedStart && formattedEnd) {
      setFilters({
        ...filters,
        checkIn: formattedStart,
        checkOut: formattedEnd === formattedStart ? "" : formattedEnd,
      });

      console.log([formattedStart, formattedEnd]);
    }
  }, [range]);

  return (
    <div
      className={`bg-white  ${
        months ? "w-[870px] ml-18 rounded-3xl p-6 shadow-xl" : ""
      }`}
    >
      <div className="flex justify-center">
        <DateRange
          ranges={range}
          onChange={(item) => {
            setRange([item.selection]);
          }}
          months={months || 1}
          direction="horizontal"
          minDate={new Date()}
          showDateDisplay={false}
          rangeColors={["#000000"]}
        />
      </div>
    </div>
  );
};

export default AirbnbDatePicker;
