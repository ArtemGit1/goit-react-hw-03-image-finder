import React from 'react';
import 'components/styles.css';

const ImageGalleryItem = ({ image, openModal }) => (
    <li key={image.id} className="gallery-item" onClick={() => openModal(image)}>
      <img src={image.webformatURL} alt="" />
    </li>
  );

export default ImageGalleryItem;
