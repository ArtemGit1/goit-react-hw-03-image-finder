import React from 'react';
import 'components/styles.css';

const Modal = ({ onClose, largeImageURL }) => (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
  
  export default Modal;
  
