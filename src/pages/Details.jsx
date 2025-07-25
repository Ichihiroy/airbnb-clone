import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPropertyById } from "../services/propertyServices";
import Loading from "./Loading";
import UserRatings from "../components/UserRatings";
import {
  CalendarFold,
  ChevronRight,
  Heart,
  KeyRound,
  MapPin,
  Share,
  Star,
  StarIcon,
} from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    getPropertyById(id).then((data) => {
      setProperty(data);
    });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 550);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!property) {
    return <Loading />;
  }

  return (
    <div className={`max-w-screen-xl mx-auto py-4 px-5 lg:px-14 lg:py-8 `}>
      {showHeader && (
        <div className="hidden md:flex gap-5 fixed top-0 left-0 w-full p-7 shadow-lg border-b  lg:px-34 mx-auto border-gray-300 z-50 bg-white ">
          <p className="text-sm">
            <a href="#photos">Photos</a>
          </p>
          <p className="text-sm">
            <a href="#amenities">Amenities</a>
          </p>
          <p className="text-sm">
            <a href="#reviews">Reviews</a>
          </p>
          <p className="text-sm">
            <a href="#location">Location</a>
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-semibold ">
          {property.title} in {property.location.city}
        </h1>
        <div className="flex gap-4 ">
          <p className="text-sm flex items-center gap-2">
            <Share size={15} />
            <span className="underline">Share</span>
          </p>
          <p className="text-sm flex items-center gap-2">
            <Heart size={15} />
            <span className="underline">Save</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-8" id="photos">
        <img
          src={property.images[0]}
          alt="Main room"
          className="w-[550px] h-101 object-cover rounded-tl-xl rounded-bl-xl col-span-2"
        />
        <div className="grid grid-cols-2 gap-1">
          {[2, 3].map((id) => (
            <img
              key={id}
              src={property.images[id - 1]}
              alt={`Room ${id}`}
              className={`w-[300px] h-50 object-cover ${
                id == 3 ? "rounded-tr-xl " : " "
              }`}
            />
          ))}
          {[3, 2].map((id) => (
            <img
              key={id}
              src={property.images[id - 1]}
              alt={`Room ${id}`}
              className={`w-full h-50 object-cover ${
                id == 2 ? " rounded-br-xl" : " "
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-35">
        <div className="flex-1 ">
          <p className="text-xl font-medium">
            {property.typeOfPlace} in {property.location.city},{" "}
            {property.location.country}
          </p>
          <p className="text-gray-800 text-md">
            {property.roomDetails.bedType} · {property.roomDetails.bathroomType}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-black">
              <Star size={10} fill="currentColor" />
            </span>
            <span>{property.rating.score}</span>
            <span>·</span>
            <span className="text-black underline">
              {property.rating.reviewsCount} reviews
            </span>
          </div>

          <div className="my-4 flex gap-4 items-center border-b pb-4 border-gray-300">
            <div className="h-[35px] w-[35px] rounded-full bg-gray-300"></div>
            <div>
              <p className="font-semibold">Hosted by {property.host.name}</p>
              <p className="text-sm text-zinc-500">
                {property.host.isSuperhost ? "Superhost · " : ""}
                {property.host.yearsHosting} years of hosting
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-2 list-inside text-md text-black space-y-3 my-8 border-b pb-8 border-gray-300">
            <li className="flex items-center gap-5">
              <KeyRound />
              <div>
                <p>Exceptional check-in experience</p>
                <p className="text-sm text-gray-500">
                  Recent guests gave the check-in process a 5-star rating.
                </p>
              </div>
            </li>
            <li className="flex items-center gap-5">
              <MapPin />
              <div>
                <p>Unbeatable location</p>
                <p className="text-sm text-gray-500">
                  100% of guests in the past year gave this location a 5-star
                  rating.
                </p>
              </div>
            </li>
            <li className="flex items-center gap-5">
              <CalendarFold />
              <div>
                <p>{property.interaction}</p>
                <p className="text-sm text-gray-500">
                  Recent guests gave the check-in process a 5-star rating.
                </p>
              </div>
            </li>
          </ul>

          <div className="w-3/4  pb-8 ">
            <p className="text-md text-gray-900">
              Historic and picturesque district. Museums and entertainment
              nearby. World restaurants and mini-markets.
            </p>
            <p className="text-md text-gray-900 mt-2">
              During your stay, I am very easily reachable for any information
              or troubleshooting needed!
            </p>
          </div>
          <hr className="mb-6 text-gray-300" />

          <div className="mt-6 border-b pb-8 border-gray-300">
            <h3 className="font-semibold mb-2">Where you’ll sleep</h3>
            <div className="border rounded-xl p-4 w-48">
              <p className="text-sm font-medium">Bedroom</p>
              <p className="text-xs text-gray-500">
                {property.roomDetails.bedType}
              </p>
            </div>
          </div>

          <div className="mt-6" id="amenities">
            <h3 className="font-semibold mb-3 text-xl">
              What this place offers
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md text-gray-800">
              {property.amenities.available.map((amenity, i) => (
                <li key={i}>{amenity}</li>
              ))}
              {property.amenities.unavailable.map((amenity, i) => (
                <li key={i} className=" line-through">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`w-[300px] lg:w-[400px]  border hidden md:block border-gray-200 rounded-xl py-5 px-6 shadow-md sticky top-25 h-[300px] self-start `}
        >
          <div className="text-lg font-semibold">
            {property.price.total} {property.price.currency} for{" "}
            {property.price.nights} nights
          </div>
          <div className="text-sm text-gray-500 mb-2">
            Prices include all fees
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm border border-gray-400 rounded-md overflow-hidden mb-4">
            <div className="p-2 border-r border-gray-400">
              <p className="font-medium">CHECK-IN</p>
              <p className="text-gray-600 text-xs">12/12/2025</p>
            </div>
            <div className="p-2">
              <p className="font-medium">CHECKOUT</p>
              <p className="text-gray-600 text-xs">12/14/2025</p>
            </div>
            <div className="col-span-2 p-2 border-t border-gray-400">
              <p className="font-medium">GUESTS</p>
              <p className="text-gray-600 text-xs">1 guest</p>
            </div>
          </div>

          <button className="w-full bg-[#FF385C] hover:bg-[#ff3860d2] text-white py-2 rounded-full font-semibold transition-colors">
            Reserve
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">
            You won’t be charged yet
          </p>
        </div>
      </div>

      {property.rating.score > 4.9 ? (
        <div
          className="w-full px-6 py-12 flex flex-col items-center text-center space-y-2 border-t border-b border-gray-300 mt-10"
          id="reviews"
        >
          <div className="flex items-center justify-center space-x-4 text-6xl font-semibold mt-4">
            <span className="text-yellow-500">
              <img
                src="/rating-left.avif"
                alt="Rating-left"
                className="w-[90px]"
              />
            </span>
            <span className="text-8xl mb-8">{property.rating.score}</span>
            <span className="text-yellow-500">
              <img
                src="/rating-right.avif"
                className="w-[90px]"
                alt="Rating-right"
              />
            </span>
          </div>

          <div className="text-2xl font-semibold">Guest favorite</div>
          <p className="text-gray-500 max-w-md">
            This home is in the <strong className="text-black">top 10%</strong>{" "}
            of eligible listings based on ratings, reviews, and reliability
          </p>
          <UserRatings />
        </div>
      ) : (
        <div
          className="w-full px-6 py-12 flex flex-col items-center text-center space-y-2 border-t border-b border-gray-300 mt-10"
          id="reviews"
        >
          <div className="flex items-center justify-center space-x-4 text-6xl font-semibold mt-4">
            <span className="text-8xl mb-8">{property.rating.score}</span>
            <span>
              <StarIcon size={40} className="mb-5" />
            </span>
          </div>

          <div className="text-2xl font-semibold">
            {property.rating.reviewsCount} reviews
          </div>

          <UserRatings />
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto px-4 py-10 ">
        <h2 className="text-2xl font-semibold mb-8">Things to know</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-b md:border-b-0 border-gray-300 pb-4">
            <h3 className="text-base font-semibold mb-2">House rules</h3>
            <ul className="text-md space-y-3">
              <li className="text-gray-500 lg:text-black">
                Check-in after 3:00 PM
              </li>
              <li className="text-gray-500 lg:text-black">
                Checkout before 11:00 AM
              </li>
              <li className="text-gray-500 lg:text-black">1 guest maximum</li>
            </ul>
            <button className="mt-4 text-sm font-semibold underline inline-flex items-center hover:opacity-80">
              Show more <ChevronRight className="ml-1" size={16} />
            </button>
          </div>

          <div className="border-b md:border-b-0 border-gray-300 pb-4">
            <h3 className="text-base font-semibold mb-2">Safety & property</h3>
            <ul className="text-md space-y-3">
              <li className="text-gray-500 lg:text-black">
                No carbon monoxide alarm
              </li>
              <li className="text-gray-500 lg:text-black">Smoke alarm</li>
              <li className="text-gray-500 lg:text-black">
                Some spaces are shared
              </li>
            </ul>
            <button className="mt-4 text-sm font-semibold underline inline-flex items-center hover:opacity-80">
              Show more <ChevronRight className="ml-1" size={16} />
            </button>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">
              Cancellation policy
            </h3>
            <ul className="text-md space-y-3">
              <li className="text-gray-500 lg:text-black">
                Free cancellation before Dec 11. Cancel before check-in on Dec
                12 for a partial refund.
              </li>
              <li className="text-gray-500 lg:text-black">
                Review this Host's full policy for details.
              </li>
            </ul>
            <button className="mt-4 text-sm font-semibold underline inline-flex items-center hover:opacity-80">
              Show more <ChevronRight className="ml-1" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
