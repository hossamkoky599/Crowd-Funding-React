import React from 'react';

const ImageSliderComponent = ({ images }) => {
  return (
    <div className="w-full h-full overflow-hidden relative">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.image}
          alt={`Project ${index}`}
          className="w-full h-full object-cover rounded-xl"
          style={{
            display: 'block',
          }}
        />
      ))}
    </div>
  );
};

export default ImageSliderComponent;
