import {
  CheckCircle,
  KeyRound,
  MapIcon,
  MessageSquare,
  SprayCan,
  Tag,
} from "lucide-react";

const UserRatings = () => {
  return (
    <>
      <div className="w-full px-4 pt-6 max-w-6xl mx-auto">
        {/* Top section: Overall rating bar */}
        <div className="flex flex-col md:flex-row md:divide-x  pb-8 mb-8">
          <div className="w-full xs:w-1/6 lg:w-1/6 px-4 mb-6 sm:mb-0">
            <div className="text-sm font-semibold mb-2">Overall rating</div>
            <div className=" text-sm">
              {[
                { score: 5, width: "95%" },
                { score: 4, width: "5%" },
                { score: 3, width: "0%" },
                { score: 2, width: "0%" },
                { score: 1, width: "0%" },
              ].map(({ score, width }) => (
                <div key={score} className="flex items-center">
                  <span className="w-4">{score}</span>
                  <div className="ml-2 w-full h-1 bg-gray-200 rounded overflow-hidden">
                    <div className="bg-black h-1" style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full sm:w-5/6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 text-center">
            <div className="flex flex-col items-start justify-between w-full lg:border-r-1 border-r-0 border-gray-300 px-4">
              <div className="flex flex-col  items-start justify-center space-x-2 mb-1">
                <div className="text-sm mb-1">Cleanliness</div>
                <div className="text-lg font-semibold">4.8</div>
              </div>

              <SprayCan size={36} className="mb-1" />
            </div>

            <div className="flex flex-col lg:items-start justify-between w-full border-r-0 lg:border-r-1 border-gray-300 px-4">
              <div className="flex flex-col  items-start justify-center space-x-2 mb-1">
                <div className="text-sm mb-1">Accuracy</div>
                <div className="text-lg font-semibold">5.0</div>
              </div>

              <CheckCircle size={36} className="mb-1" />
            </div>

            <div className="flex flex-col items-start justify-between w-full border-r-0 lg:border-r-1 border-gray-300 px-4">
              <div className="flex flex-col  items-start justify-center space-x-2 mb-1">
                <div className="text-sm mb-1">Check-In</div>
                <div className="text-lg font-semibold">4.7</div>
              </div>

              <KeyRound size={36} className="mb-1" />
            </div>

            <div className="flex flex-col items-start justify-between w-full border-r-0 lg:border-r-1 border-gray-300 px-4">
              <div className="flex flex-col  items-start justify-center space-x-2 mb-1">
                <div className="text-sm mb-1">Communication</div>
                <div className="text-lg font-semibold">4.9</div>
              </div>

              <MessageSquare size={36} className="mb-1" />
            </div>

            <div className="flex flex-col items-start justify-between w-full border-r-0 lg:border-r-1 border-gray-300 px-4">
              <div className="flex flex-col  items-start justify-center space-x-2 mb-1">
                <div className="text-sm mb-1">Location</div>
                <div className="text-lg font-semibold">4.9</div>
              </div>

              <MapIcon size={36} className="mb-1" />
            </div>

            <div className="flex flex-col items-start justify-between w-full   px-4">
              <div className="flex flex-col  items-start justify-center space-x-2 mb-1">
                <div className="text-sm mb-1">Value</div>
                <div className="text-lg font-semibold">4.8</div>
              </div>

              <Tag size={36} className="mb-1" />
            </div>
          </div>
        </div>
      </div>
      <hr className="text-gray-300" />
    </>
  );
};

export default UserRatings;
