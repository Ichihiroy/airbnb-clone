import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AirbnbDatePicker = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl w-[870px] ml-16">
      <div className="flex justify-center">
        <DateRange
          ranges={range}
          onChange={(item) => setRange([item.selection])}
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
