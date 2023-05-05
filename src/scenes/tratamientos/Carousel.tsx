import React, { useState, useEffect } from "react";
import ImageSlide from "./ImageSlide";
import { ClassType } from "@/shared/types";

interface CarouselProps {
  images: ClassType[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  useEffect(() => {
    const intervalo = setInterval(() => {
      goToNextSlide()
    }, 4000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
       setCurrentIndex(images.length - 3);
       setTranslateValue( ((images.length - 3) * slideWidth()) * -1 );
    } else {
      setCurrentIndex(currentIndex - 1);
      setTranslateValue(translateValue + slideWidth());
    };
  };

  const goToNextSlide = () => {
    if (currentIndex === images.length - 3) {
      setCurrentIndex(0);
      setTranslateValue(0);
      slideWidth()
    } else {
      setCurrentIndex(currentIndex + 1);
      setTranslateValue(translateValue - slideWidth());
    }

  };

  const slideWidth = () => {
    const sld = document.querySelector(".slide")
    if (sld) {
      return sld.clientWidth + 20;
    }

    return 0
  };

  return (
    <div className="carousel w-full flex ">
      <button className={`carousel-control prev px-1 hover:bg-primary-300 h-[300px]`}
          onClick={goToPrevSlide}
        >
        <span className="sr-only" style={{position: 'relative'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
        </span>
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <div className="px-3 mx-0 flex w-full overflow-hidden">
        <div className="mx-0 px-0 items-center justify-between gap-5 md:flex"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: "transform ease-out 0.45s",
            width: '100%',
          }}
        >
          {images.map((image, index) => (
            <ImageSlide
              key={index}
              name={image.name}
              description={image.description}
              url={image.url}
            />
          ))}
        </div>
      </div>
      <button
        className={`carousel-control next px-1 hover:bg-primary-300 h-[300px]`}
        onClick={goToNextSlide}
      >
        <span className="sr-only " style={{position: 'relative'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </span>
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Carousel;
