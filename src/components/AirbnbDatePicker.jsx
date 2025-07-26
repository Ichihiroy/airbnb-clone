import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AirbnbDatePicker = ({ setFilters, filters }) => {
  const [range, setRange] = useState([
    {
      startDate: filters?.checkIn ? new Date(filters.checkIn) : new Date(),
      endDate: filters?.checkOut
        ? new Date(filters.checkOut)
        : addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const date = range
      .map(
        (obj) =>
          `${obj.startDate?.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })} , ${obj.endDate?.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}`
      )[0]
      .split(" , ");

    console.log(date);

    setFilters({
      ...filters,
      checkIn: date[0],
      checkOut: date[1] == date[0] ? "" : date[1],
    });
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
