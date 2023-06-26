import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Replace YOUR_API_ENDPOINT with the actual API endpoint to fetch the co-properties data
    fetch('http://127.0.0.1:8000/api/getCoproperty')
      .then(response => response.json())
      .then(data => {
        const processedData = data.map(item => ({
          id: item.id_copropriete,
          property: {
            name: item.name,
            address: item.adress,
            zip_code: item.zip_code,
            city: item.city,
            nbr_appartement: item.nbr_appartement,
            etage: item.etage,
            id_syndic: item.id_syndic
          }
        }));
        setImages(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleImageClick = (imageId) => {
    setSelectedImage(imageId === selectedImage ? null : imageId);
  };

  const handleImageMouseEnter = (imageId) => {
    setHoveredImage(imageId);
  };

  const handleImageMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-20">
      {images.map((image) => (
        <div
          key={image.id}
          className={`relative transform transition-transform duration-300 ${
            hoveredImage === image.id ? 'scale-105' : ''
          } mr-4`}
        >
          <img
            src={require(`../data/${image.id}.jpg`)} // Replace PATH_TO_YOUR_IMAGE_DIRECTORY with the actual path to your image directory
            alt={image.property.name}
            className={`cursor-pointer ${image.id === selectedImage ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleImageClick(image.id)}
            onMouseEnter={() => handleImageMouseEnter(image.id)}
            onMouseLeave={handleImageMouseLeave}
          />
          {image.id === selectedImage && (
            <div className="absolute inset-0 bg-white p-4 rounded-lg shadow transform rotate-y-180">
              <h2 className="text-lg font-semibold">{image.property.name}</h2>
              <p>Address: {image.property.address}</p>
              <p>Zip Code: {image.property.zip_code}</p>
              <p>City: {image.property.city}</p>
              <p>Number of Apartments: {image.property.nbr_appartement}</p>
              <p>Floor: {image.property.etage}</p>
              <p>Syndic ID: {image.property.id_syndic}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
