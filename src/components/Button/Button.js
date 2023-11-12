import React from 'react';
import 'components/styles.css';


const Button = ({ onLoadMore }) => (
    <button className="Button" type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
  
export default Button;
  
  