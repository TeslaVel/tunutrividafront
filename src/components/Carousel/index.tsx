import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// types
import { ClassType } from "@/types";

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
          // Antes la descripción solo aparecía en :hover (invisible en
          // touch/mobile). Ahora va siempre visible en un panel debajo de
          // la imagen, en vez de un overlay oculto.
          <div
            key={index}
            className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
          >
            <div
              className="h-48 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className="flex flex-1 flex-col p-4">
              { withTitle &&
                <h3 className="text-center text-lg font-semibold text-landing-ink">{image.name}</h3>
              }
              { withDescription && image.description &&
                <p className="mt-2 max-h-[4.5rem] overflow-hidden text-sm text-landing-muted">
                  {image.description}
                </p>
              }
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
};

export default CarouselMulti;
