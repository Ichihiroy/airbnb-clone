import { ArrowLeft, Star, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { getPropertyById } from "../services/propertyServices";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [listing, setListing] = useState(null);
  const location = useLocation();
  const bookingData = location.state;

  useEffect(() => {
    getPropertyById(bookingData.propertyId).then((data) => {
      setListing(data);
    });
  }, [bookingData.propertyId]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 relative">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <Link to={-1}>
            <button
              type="button"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 absolute right-320 top-4"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Request to book
          </h1>
          <Link
            to={-1}
            className="absolute right-4.5 top-3.5 md:hidden rounded-full bg-gray-100 p-2"
          >
            <X size={20} />
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-4 w-full">
            <section className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-semibold">1. Choose when to pay</h2>
            </section>

            <section className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-semibold">2. Add a payment method</h2>
            </section>

            <section className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-semibold">3. Review your request</h2>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 shadow-sm shadow-black/5 p-4 sm:p-6 sticky top-4">
              <div className="flex items-start gap-3">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {listing?.images[0] ? (
                    <img
                      alt="Listing"
                      src={listing.images[0]}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{listing?.title}</div>
                  <div className="mt-1 text-sm text-gray-600 flex gap-1 items-center ">
                    <Star size={10} fill="gray" /> {listing?.rating.score} (
                    {listing?.rating.reviewsCount})
                  </div>
                </div>
              </div>

              {/* Policy / cancellation */}
              <div className="mt-4 text-sm">
                <div className="font-medium">Free cancellation</div>
                <div className="text-gray-600">
                  Cancel before Nov 23 for a full refund. Full policy
                </div>
              </div>

              {/* Dates */}
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-b border-gray-200 py-4">
                <div className="text-sm">
                  <div className="font-medium">Dates</div>
                  <div className="text-gray-600">
                    {bookingData.checkIn} - {bookingData.checkOut}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <div className="text-sm">
                  <div className="font-medium">Guests</div>
                  <div className="text-gray-600">{bookingData.guestCount}</div>
                </div>
              </div>

              {/* Price details */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="text-sm font-medium">Price details</div>
                <div className="mt-2 flex flex-col gap-2"></div>
                <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                  <div>Total </div>
                  <div>
                    {bookingData.totalPrice}{" "}
                    <span className="underline">{listing?.price.currency}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-2 text-sm font-medium underline underline-offset-2"
                >
                  Price breakdown
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
