import React from 'react';
import 'components/styles.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => (
    <ul className="gallery">
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
  
export default ImageGallery;