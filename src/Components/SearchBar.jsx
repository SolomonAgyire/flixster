import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const handleCancel = () => {
    setSearchQuery("");
    onSearch(""); // This will trigger a reset of the search results
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies..."
          className="search-input"
        />
        {searchQuery && (
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
            aria-label="Clear search"
          />
        )}
        <button type="submit" className="search-button" aria-label="Search" />
      </div>
    </form>
  );
}

export default SearchBar;
