import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function getUnavailableDates(checkIn, checkOut) {
  const dates = [];
  let current = new Date(checkIn);
  const end = new Date(checkOut);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates.map((date) => date.toDateString());
}

export default function PropertyCalendar({ propertyId }) {
  const bookedProperties = JSON.parse(
    localStorage.getItem("propertyBookings") || "{}"
  );

  const propertyBookings = bookedProperties[propertyId] || [];
  const { checkIn, checkOut } = propertyBookings || {};
  const unavailableDates = getUnavailableDates(checkIn, checkOut);

  const dayContentRenderer = (date) => {
    const isUnavailable = unavailableDates.includes(date.toDateString());
    return (
      <div
        className={`airbnb-day${
          isUnavailable ? " airbnb-day-unavailable" : ""
        }`}
        style={{ color: isUnavailable ? "#fff" : "#222" }}
      >
        {date.getDate()}
      </div>
    );
  };

  return (
    <div className="airbnb-calendar rounded-2xl bg-white max-w-md overflow-x-scroll">
      <div className="calendar-wrapper">
        <Calendar
          disabledDates={unavailableDates.map((d) => new Date(d))}
          dayContentRenderer={dayContentRenderer}
          color="#FF5A5F"
          rangeColors={["#FF5A5F"]}
          showDateDisplay={false}
          months={2}
          className="airbnb-calendar-component"
        />
      </div>
      <style>{`
        .airbnb-calendar {
          max-width: 2500px; /* Make the calendar significantly larger */
          width: 100%; /* Ensure it takes the full width of the container */
          margin-left: 0; /* Align the calendar to the left */
          background: #fff;
        }
        .airbnb-calendar-header {
          padding-bottom: 8px;
          border-bottom: 1px solid #f2f2f2;
        }
        .airbnb-day {
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: background 0.2s;
        }
        .airbnb-day-unavailable {
          background: #222 !important;
          color: #fff !important;
        }
        .rdrDayDisabled .airbnb-day {
          background: #222 !important;
          color: #fff !important;
          opacity: 1 !important;
        }
        .rdrDayNumber span {
          font-weight: 600;
        }
        .airbnb-calendar-component {
          border-radius: 24px;
          max-width: 800px; /* Increase maximum width for better appearance */
          width: 100%; /* Ensure it takes full width of the container */
          margin: 0 auto; /* Center the calendar */
        }
        .airbnb-calendar-component .rdrDay {
          pointer-events: none; /* Disable all interactions */
          cursor: default; /* Ensure no hover effect */
        }
        .airbnb-calendar-component .rdrDay:hover {
          background: none !important; /* Remove hover background */
        }
        .airbnb-calendar-component .rdrMonths {
          flex-direction: row !important; /* Force horizontal layout */
          gap: 16px; /* Add spacing between months */
        }
        .calendar-wrapper {
          
          display: flex;
          flex-direction: column; /* Force vertical stacking */
          gap: 16px; /* Add spacing between months */
          width: 100%; /* Ensure full width for proper layout */
          max-width: 1000px; /* Limit maximum width for better appearance */
          margin: 0; 
        }
        @media (max-width: 576px) {

          .airbnb-calendar-component .rdrMonths > div:nth-child(2) {
            display: none !important; /* Hide the second month on mobile */
          }
            .calendar-wrapper {
            margin: 0 auto;
            width: 100%;
            justify-content: center;
            align-items: center;
          }
          .airbnb-calendar-component {
            max-width: 100%; /* Ensure full width on mobile */
            margin: 0 auto;
          }

          .rdrMonths {
            margin: 0 auto;
            width: 100%;
            justify-content: center;
            align-items: center;
          }

        }
      `}</style>
    </div>
  );
}
