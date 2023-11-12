import React, { useState } from 'react';
import 'components/styles.css';

const Searchbar = ({ onSubmit }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(searchQuery);
    };
  
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
  
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </header>
    );
  };
  
  export default Searchbar;
