import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AirbnbDatePicker = ({ setFilters, filters }) => {
  const [range, setRange] = useState([
    {
      startDate:
        filters?.checkIn && !isNaN(new Date(filters.checkIn))
          ? new Date(filters.checkIn)
          : new Date(),
      endDate:
        filters?.checkOut && !isNaN(new Date(filters.checkOut))
          ? new Date(filters.checkOut)
          : addDays(new Date(), 1),
      key: "selection",
    },
  ]);

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
    <div className="bg-white rounded-3xl p-6 shadow-xl w-[870px] ml-18">
      <div className="flex justify-center">
        <DateRange
          ranges={range}
          onChange={(item) => {
            setRange([item.selection]);
          }}
          months={2}
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
