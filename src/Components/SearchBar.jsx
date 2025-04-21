import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    charges: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={searchCriteria.location}
            onChange={handleChange}
            placeholder="Search by location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="charges">Charges</label>
          <input
            type="text"
            id="charges"
            name="charges"
            value={searchCriteria.charges}
            onChange={handleChange}
            placeholder="Search by charges (e.g., $50/hour)"
          />
        </div>
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}