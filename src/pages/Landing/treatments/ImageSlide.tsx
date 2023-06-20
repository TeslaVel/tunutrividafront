import React from 'react';

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

  // const overlayStyles = `p-5 absolute z-30 flex
  // h-[300px] w-1/4 flex-col items-center justify-center
  // whitespace-normal bg-primary-500 text-center text-white
  // opacity-0 transition duration-500 hover:opacity-90`;

const classes = 'xs:max-w-[13rem] sm:max-w-[18rem] md:max-w-[24rem] max-w-[40rem] max-h-[15rem] h-[15rem] y w-[24rem]';

  return (
    <div className="slide">
      <img src={url} className={`object-cover ${classes} rounded-lg`} alt="Slide" />
      <div className="caption h-[150px]">
        <h3 className="text-lg text-center font-semibold">{name}</h3>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSlide;
