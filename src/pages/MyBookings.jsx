import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { getAllProperties } from "../services/propertyServices";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadBookings();
    getAllProperties()
      .then((data) => setProperties(data))
      .catch((error) => {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties");
      });
  }, []);

  const loadBookings = () => {
    try {
      const allBookings = JSON.parse(
        localStorage.getItem("propertyBookings") || "{}"
      );

      const bookingsArray = Object.values(allBookings);
      setBookings(bookingsArray);
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateRange = (checkIn, checkOut) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const startMonth = startDate.toLocaleDateString("en-US", {
      month: "short",
    });
    const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });

    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()}–${endDate.getDate()}`;
    } else {
      return `${startMonth} ${startDate.getDate()} – ${endMonth} ${endDate.getDate()}`;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Link
        to={-1}
        className="max-w-6xl mx-auto px-6 py-4 flex md:hidden items-center gap-2 text-gray-900"
      >
        <ArrowLeft /> Go Back
      </Link>
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Trips</h1>
          <p className="text-gray-600">Your upcoming and past reservations</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              No trips booked...yet!
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Time to dust off your bags and start planning your next adventure
            </p>
            <Link
              to="/"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Start searching
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking, index) => (
              <div
                key={booking.propertyId || index}
                className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-64 lg:h-48 w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      {/* <div className="text-center text-gray-500">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                          <MapPin className="h-8 w-8" />
                        </div>
                        <div className="text-sm font-medium">
                          Property Photo
                        </div>
                      </div> */}
                      <img
                        src={properties[booking.propertyId - 1]?.images[0]}
                        alt="Image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">
                            {properties[booking.propertyId - 1]?.title ||
                              `Booking ${booking.propertyId}`}
                          </h2>
                          <p className="text-gray-600 mb-3">
                            {properties[booking.propertyId - 1]?.location.city +
                              ", " +
                              properties[booking.propertyId - 1]?.location
                                .country}
                          </p>

                          <div className="flex items-center text-gray-700 mb-4">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="font-medium">
                              {formatDateRange(
                                booking.checkIn,
                                booking.checkOut
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-semibold text-gray-900">
                            {booking.totalPrice || 0}
                            {properties[booking.propertyId - 1]?.price
                              .currency || 0}
                          </div>
                          <div className="text-sm text-gray-600">total</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-100">
                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            Check-in
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(booking.checkIn)}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            Check-out
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(booking.checkOut)}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            Guests
                          </div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {booking.guestCount ||
                              booking.guests?.adults +
                                booking.guests?.children ||
                              1}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            Nights
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.nights} night
                            {booking.nights !== 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4">
                        <Link
                          to={`/details/${booking.propertyId}`}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-2.5 border border-gray-900 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200"
                        >
                          View property
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>

                        <button className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                          Get help
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
