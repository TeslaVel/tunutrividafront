import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RectangleIcon from '@/components/icons/rectangleIcon'


// types
import { ClassType, Colors } from "@/types";

interface CarouselProps {
  images: ClassType[];
  deviceType: string
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1600 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1600, min: 860 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 860, min: 450 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 450, min: 0 },
    items: 1
  }
};

const CarouselMulti: React.FC<CarouselProps> = ({ images, deviceType = 'desktop' }) => {
  const CustomDot = ({ onClick, ...rest }: any) => {
    const {
      index,
      active,
      carouselState: { currentSlide, deviceType }
    } = rest;

    return (
      <button
        onClick={() => onClick()}
      >
        <RectangleIcon
          width={20}
          height={20}
          color={active ? Colors.DARKPURPLE600 : Colors.NONE}
        />
      </button>
    );
  };

  return (
    <div className='relative pb-[30px]'>
      <Carousel
        customDot={<CustomDot />}
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        // autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass='custom-dot-list-style'
        itemClass="p-2"
        renderDotsOutside
      >
        {images.map((image, index) => (
          <div className="w-full h-full flex flex-col">
            <img src={image.url} className="relative w-full h-full rounded-lg h-[270px] h-min-[200px]"/>
            <div className="px-2 pt-1"><h3 className="text-lg text-center font-semibold" >{image.name}</h3></div>
            <div className="absolute px-2 pt-4 rounded-lg opacity-0 w-[20rem] h-[17rem] hover:opacity-[0.8] hover:bg-rgba-82">
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
};

export default CarouselMulti;
