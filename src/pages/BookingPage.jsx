import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function BookingPage({
  listing = {}, // { title, imageUrl, rating, reviewsCount, isSuperhost }

  price = {}, // { lineItems: [{label, value}], totalLabel, totalValue }
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 relative">
        <div className="flex items-center gap-3">
          <Link to={-1}>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 absolute right-320 top-4"
              aria-label="Back"
            >
              <ArrowLeft size={25} />
            </button>
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Request to book
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-4 w-full">
            {/* Step 1: Choose when to pay */}
            <section className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-semibold">1. Choose when to pay</h2>
              {/* Insert your payment form here */}
            </section>

            {/* Step 2 */}
            <section className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-semibold">2. Add a payment method</h2>
              {/* Insert your payment form here */}
            </section>

            {/* Step 3 */}
            <section className="rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-semibold">3. Review your request</h2>
              {/* Add review details / notes textarea / policies here */}
            </section>
          </div>

          {/* Right column: Summary */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 shadow-sm shadow-black/5 p-4 sm:p-6 sticky top-4">
              {/* Listing header */}
              <div className="flex items-start gap-3">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {/* Replace src with listing.imageUrl */}
                  {listing?.imageUrl ? (
                    <img
                      src={listing.imageUrl}
                      alt="Listing"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="font-semibold leading-5 truncate">
                    {/* {listing.title} */}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {/* ratings / superhost badges if needed */}
                  </div>
                </div>
              </div>

              {/* Policy / cancellation */}
              <div className="mt-4 text-sm">
                <div className="font-medium">{/* Free cancellation */}</div>
                <div className="text-gray-600">{/* Policy text */}</div>
              </div>

              {/* Dates */}
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-200 pt-4">
                <div className="text-sm">
                  <div className="font-medium">Dates</div>
                  <div className="text-gray-600">
                    {/* {dates.start} – {dates.end} */}
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200"
                >
                  Change
                </button>
              </div>

              {/* Guests */}
              <div className="mt-2 flex items-center justify-between gap-2">
                <div className="text-sm">
                  <div className="font-medium">Guests</div>
                  <div className="text-gray-600">{/* {guests.label} */}</div>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium hover:bg-gray-200"
                >
                  Change
                </button>
              </div>

              {/* Price details */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="text-sm font-medium">Price details</div>
                <div className="mt-2 flex flex-col gap-2">
                  {/* Map your own line items here */}
                  {/* Example: price.lineItems?.map(({label, value}) => ( ... )) */}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                  <div>{price.totalLabel /* e.g., "Total" */}</div>
                  <div>{price.totalValue /* e.g., "$244.61" */}</div>
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
