import React, { useEffect, useState } from 'react';
import { Image } from "@nextui-org/react"; // Adjust imports according to your setup

const RandomImageCard = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const randomImageUrl = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
        setImageSrc(randomImageUrl);
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <Image
      alt="Random background"
      className="object-cover rounded-xl" // Removed margins for better centering
      src={imageSrc}
      width={300} // Width of the image
      height={200} // Height of the image
    />
  );
};

export default RandomImageCard;
