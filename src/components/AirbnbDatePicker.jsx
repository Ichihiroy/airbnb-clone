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

    const startDate = range[0].startDate;
    const endDate = range[0].endDate;

    if (
      startDate &&
      endDate &&
      startDate instanceof Date &&
      endDate instanceof Date &&
      !isNaN(startDate.getTime()) &&
      !isNaN(endDate.getTime()) &&
      startDate.getTime() !== endDate.getTime()
    ) {
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);

      if (formattedStart && formattedEnd) {
        setFilters({
          ...filters,
          checkIn: formattedStart,
          checkOut: formattedEnd,
        });
      }
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
          showSelectionPreview={false}
          moveRangeOnFirstSelection={false}
          retainEndDateOnFirstSelection={false}
        />
      </div>
    </div>
  );
};

export default AirbnbDatePicker;
