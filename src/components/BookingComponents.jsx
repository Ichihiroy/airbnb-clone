import { useContext, useEffect, useState } from "react";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { BookingContext } from "../context/BookingsContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const BookingComponent = ({ mobile, ...property }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const userData = localStorage.getItem("userData");
  const { setReserveDetails } = useContext(BookingContext);
  const navigate = useNavigate();

  const calculateStay = () => {
    if (!checkIn || !checkOut) return { nights: 0, total: 0 };

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const total = nights > 0 ? nights * property?.price?.nightlyRate : 0;

    return { nights: nights > 0 ? nights : 0, total };
  };

  const { nights, total } = calculateStay();

  const maxGuestsConfig = {
    adults: property?.maxGuests?.adults || 1,
    children: property?.maxGuests?.children || 5,
    infants: property?.maxGuests?.infants || 5,
    pets: property?.maxGuests?.pets || 1,
  };

  const updateGuestCount = (type, increment) => {
    setGuests((prev) => {
      const newCount = increment
        ? Math.min(prev[type] + 1, maxGuestsConfig[type])
        : Math.max(prev[type] - 1, type === "adults" ? 1 : 0);

      return { ...prev, [type]: newCount };
    });
  };

  useEffect(() => {
    setReserveDetails({
      nights,
      total,
      currency: property?.price.currency,
    });
  }, [nights, total, property?.price.currency]);

  const bookedProperties = JSON.parse(
    localStorage.getItem("propertyBookings") || "{}"
  );

  const getTotalGuests = () => {
    return guests.adults + guests.children + guests.infants + guests.pets;
  };

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (!userData) {
      toast.error("Please log in to make a reservation");
      return;
    }

    if (bookedProperties[property.id]) {
      const existingCheckIn = new Date(bookedProperties[property.id].checkIn);
      const existingCheckOut = new Date(bookedProperties[property.id].checkOut);
      const newCheckIn = new Date(checkIn);
      const newCheckOut = new Date(checkOut);

      const hasOverlap =
        (newCheckIn < existingCheckIn && newCheckOut > existingCheckIn) ||
        (newCheckIn < existingCheckOut && newCheckOut > existingCheckOut) ||
        (newCheckIn >= existingCheckIn && newCheckOut <= existingCheckOut) ||
        (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut) ||
        newCheckIn.getTime() === existingCheckIn.getTime() ||
        newCheckOut.getTime() === existingCheckOut.getTime();

      if (hasOverlap) {
        const formatDate = (date) => date.toLocaleDateString();
        toast.error(
          `Property is already booked from ${formatDate(
            existingCheckIn
          )} to ${formatDate(existingCheckOut)}. Please select different dates.`
        );
        return;
      }
    }

    const reservationData = {
      propertyId: property.id,
      checkIn,
      checkOut,
      guests,
      nights,
      totalPrice: Number(total),
      guestCount: getTotalGuests(),
      nightlyRate: property?.price?.nightlyRate,
      reservedAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("propertyBookings") || "{}"
    );
    existingBookings[property.id] = reservationData;
    localStorage.setItem("propertyBookings", JSON.stringify(existingBookings));

    console.log("Reservation saved to localStorage:", reservationData);
    navigate(`/booking/${property.id}`, {
      state: reservationData,
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMinCheckoutDate = () => {
    if (!checkIn) return getTomorrowDate();
    const checkInDate = new Date(checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split("T")[0];
  };

  const guestTypeLabels = {
    adults: { label: "Adults", subtitle: "Age 13+" },
    children: { label: "Children", subtitle: "Ages 2-12" },
    infants: { label: "Infants", subtitle: "Under 2" },
    pets: { label: "Pets", subtitle: "Bringing a service animal?" },
  };

  return (
    <div className="relative">
      <div className={`max-w-md mx-auto ${mobile ? "mt-8" : "mt-0"}`}>
        <div className="">
          <div className="flex items-baseline justify-between mb-2">
            {total > 0 ? (
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-semibold text-gray-900">
                  {total} {property?.price?.currency}
                </span>
                <span className="text-gray-600 font-medium">
                  for {nights} night{nights !== 1 ? "s" : ""}
                </span>
              </div>
            ) : (
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-semibold text-gray-900">
                  {property?.price?.total} {property?.price?.currency}
                </span>
                <span className="text-gray-600 font-medium">
                  for {property?.price?.nights} nights
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="">
          <div className="border-1 border-gray-300 rounded-t-2xl overflow-hidden hover:border-gray-400 transition-colors duration-200">
            <div className="grid grid-cols-2">
              <div className="relative border-r border-gray-300">
                <label className="absolute top-3 left-4 text-xs font-semibold text-gray-900 uppercase tracking-wide">
                  Check-in
                </label>
                <div className="pt-8 pb-4 px-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="date"
                      // placeholder={property?.stayDates?.check_in}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={getTomorrowDate()}
                      className="text-sm font-medium text-gray-900 bg-transparent border-none outline-none w-full cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="absolute top-3 left-4 text-xs font-semibold text-gray-900 uppercase tracking-wide">
                  Checkout
                </label>
                <div className="pt-8 pb-4 px-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="date"
                      // placeholder={addDaysToDate(
                      //   property?.stayDates?.check_in,
                      //   property?.price?.nights
                      // )}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={getMinCheckoutDate()}
                      className="text-sm font-medium text-gray-900 bg-transparent border-none outline-none w-full cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="border-1 rounded-b-2xl border-t-0 transition-all duration-200 border-gray-300">
            <label className="absolute top-3 left-4 text-xs font-semibold text-gray-900 uppercase tracking-wide z-10">
              Guests
            </label>
            <button
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full pt-8 pb-4 px-4 text-left hover:bg-gray-50 rounded-2xl transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">
                    {getTotalGuests()} guest{getTotalGuests() !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </button>
          </div>
          <ChevronDown
            size={25}
            className={`text-gray-700 transition-transform duration-200 absolute right-4 top-1/2 transform -translate-y-1/2 ${
              showGuestPicker ? "rotate-180" : ""
            }`}
          />
        </div>

        {showGuestPicker && (
          <div className="absolute left-0 right-6 bg-white border w-full border-gray-200 rounded-2xl shadow-2xl py-4 z-50 mt-2">
            {Object.entries(maxGuestsConfig).map(([type, maxCount], index) => (
              <div
                key={type}
                className={`px-6 py-4 ${
                  index !== Object.keys(maxGuestsConfig).length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {guestTypeLabels[type].label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {guestTypeLabels[type].subtitle}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateGuestCount(type, false)}
                      disabled={guests[type] === (type === "adults" ? 1 : 0)}
                      className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-900 transition-all duration-200 active:scale-95 disabled:hover:border-gray-400"
                    >
                      <Minus className="h-3 w-3 text-gray-700" />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900">
                      {guests[type]}
                    </span>
                    <button
                      onClick={() => updateGuestCount(type, true)}
                      disabled={guests[type] === maxCount}
                      className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-900 transition-all duration-200 active:scale-95 disabled:hover:border-gray-400"
                    >
                      <Plus className="h-3 w-3 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="px-6 pt-4">
              <button
                onClick={() => setShowGuestPicker(false)}
                className="text-sm font-medium text-gray-900 underline hover:text-gray-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className={`pt-4 ${mobile ? "absolute inset-x-0 top-125" : ""}`}>
          <button
            onClick={handleReserve}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3.5 px-4 rounded-full text-base transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Reserve
          </button>

          <p className="text-center text-gray-600 text-sm mt-3 font-medium">
            You won't be charged yet
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingComponent;
