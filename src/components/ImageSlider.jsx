import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = ({ images }) => {
  if (!images || images.length === 0) return <p>No images available.</p>;

  return (
    <Carousel showThumbs={false} dynamicHeight infiniteLoop autoPlay>
      {images.map((img, index) => (
        <div key={index}>
          <img
            src={img.image}
            alt={`project-img-${index}`}
            className="rounded-xl shadow-md"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
