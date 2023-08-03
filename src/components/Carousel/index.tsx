import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RectangleIcon from '@/components/icons/rectangleIcon'


// types
import { ClassType, Colors } from "@/types";
import { HexbinSeries } from "react-vis";

interface CarouselProps {
  images: ClassType[];
  deviceType: string
  withDescription?: boolean
  withTitle?: boolean
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

const CarouselMulti: React.FC<CarouselProps> = ({
  images,
  deviceType = 'desktop',
  withDescription,
  withTitle
}) => {
  const CustomDot = ({ onClick, ...rest }: any) => {
    const {
      index,
      active,
      carouselState: { currentSlide, deviceType }
    } = rest;

    let circleStyle = {
      border: 'thin solid rgba(181, 107, 217, 0.74)',
      borderRadius: '2em',
      margin: '0 4px',
      color: 'black',
      display: 'inline-block',
      height: '.9em',
      width: '.9em',
      background: active ? 'rgba(168, 89, 202, 0.5)' : 'none',
      transition: 'background-color .4s ease-out'
    }
    return (
      <button
        onClick={() => onClick()}
      >
        <span style={circleStyle}/>
      </button>
    );
  };

  return (
    <div className='relative pb-[30px]'>
      <Carousel
        customDot={<CustomDot />}
        swipeable={false}
        draggable={true}
        showDots={true}
        responsive={responsive}
        infinite={true}
        // autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass='custom-dot-list-style'
        itemClass="px-2"
        renderDotsOutside
      >
        {images.map((image, index) => (
          <div key={index} className="hover:scale-105 hover:rounded-xl transition-transform">
            <div className="
              w-full h-full flex flex-col h-[350px] h-min-[250px]
              rounded-md border-2"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover'
              }}>
              { withDescription &&
                <div
                className="absolute p-5 rounded-lg opacity-0 w-full h-full hover:opacity-[0.8] hover:bg-rgba-82"
                style={{
                  height: 'inherit',
                  width: '',//calc(100% - 1em)
                  transition: 'all .2s linear'
                }}>
                  <p className="text-primary-female-600"
                  style={{
                    fontSize: '17px',
                    textAlign: 'justify',
                    textJustify: 'inter-word'
                  }}
                  >{image.description}</p>
                </div>
              }
            </div>
            { withTitle &&
              <div className="px-2 pt-1 text-white-01"><h3 className="text-lg text-center font-semibold" >{image.name}</h3></div>
            }
          </div>
        ))}
      </Carousel>
    </div>
  )
};

export default CarouselMulti;
