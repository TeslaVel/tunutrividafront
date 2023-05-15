import React, { CSSProperties } from 'react';
// type Position = CSSProperties['position'];

interface ImageSlideProps {
  name: string;
  description?: string;
  url: string;
}

const ImageSlide: React.FC<ImageSlideProps> = ({
  name,
  description,
  url,
}) => {
  const imageStyles = {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "300px",
    borderRadius: "6px"
  };

  // const descriptionStyles: CSSProperties = {
  //   backgroundColor: "rgba(255, 192, 203, 0.75)",
  //   color: "#fff",
  //   fontSize: "20px",
  //   lineHeight: "1.2",
  //   padding: "4px",
  //   bottom: "0",
  //   width: "100%",
  //   height: "100%",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  //   display: "-webkit-box",
  //   WebkitLineClamp: 2,
  //   position: 'absolute',
  //   borderRadius: "6px"
  // };

  const overlayStyles = `p-5 absolute z-30 flex
  h-[300px] w-1/4 flex-col items-center justify-center
  whitespace-normal bg-primary-500 text-center text-white
  opacity-0 transition duration-500 hover:opacity-90`;

  return (
    <div className="slide flex-shrink-0 w-[33%]">
      <div className="image-container relative" style={imageStyles}>
        {/* <div className={`description-container ${overlayStyles}`} style={descriptionStyles}>
          {description}
        </div> */}
      </div>
      <div className="caption h-[150px]">
        <h3 className="text-lg text-center font-semibold">{name}</h3>
        <div>
          <p>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlide;
