import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "./PropertyCard";

const PropertySection = ({ title, properties }) => {
  const scrollRef = useRef(null);
  const cardRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current && cardRef.current) {
      const scrollContainer = scrollRef.current;
      const cardWidth = cardRef.current.offsetWidth + 16;
      const offset = direction === "left" ? -cardWidth : cardWidth;
      scrollContainer.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-3">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-full hover:bg-gray-200 hidden md:block"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-full hover:bg-gray-200 hidden md:block"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollRef}
          className="flex gap-4 px-3 pb-2 overflow-x-auto scrollbar-hide"
        >
          {properties.map((property, index) => (
            <div key={index} ref={index === 0 ? cardRef : null}>
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertySection;
