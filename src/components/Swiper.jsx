import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

const SwiperComponent = ({ images, title }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = Math.min(images?.length || 0, 3);

  return (
    <div className="md:hidden w-full relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
        className="h-64 sm:h-72 md:h-80 w-full"
      >
        {images?.slice(0, 3).map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded-lg z-10">
        {currentSlide}/{totalSlides}
      </div>
    </div>
  );
};

export default SwiperComponent;
