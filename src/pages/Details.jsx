import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPropertyById } from "../services/propertyServices";
import Loading from "./Loading";
import {
  CalendarFold,
  Heart,
  KeyRound,
  MapPin,
  Share,
  Star,
} from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyById(id).then((data) => {
      setProperty(data);
    });
  }, [id]);

  if (!property) {
    return <Loading />;
  }

  return (
    <div className="max-w-screen-xl mx-auto py-4 px-5 lg:px-14 lg:py-8">
      <div className="flex justify-between items-center mb-4">
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

      <div className="flex justify-center gap-2 mb-8">
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

      <div className="flex flex-col lg:flex-row gap-35">
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
              <p className="text-xs text-gray-500">1 single bed</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-xl">
              What this place offers
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-md text-gray-800">
              <li>Kitchen</li>
              <li>Wifi</li>
              <li>Dedicated workspace</li>
              <li>Free washer – In unit</li>
              <li>Free dryer – In unit</li>
              <li>Bathtub</li>
              <li>Indoor fireplace: wood-burning</li>
              <li>Luggage dropoff allowed</li>
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-[400px] border border-gray-200 rounded-xl py-5 px-6 shadow-md sticky top-10 h-[300px]">
          <div className="text-lg font-semibold">$200 for 2 nights</div>
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

          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-semibold transition-colors">
            Reserve
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">
            You won’t be charged yet
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
