import React, { useState, useEffect, useRef } from "react";
import { FaSort, FaFilter, FaTimes } from "react-icons/fa";
import "./FilterControls.css";

const sortOptions = [
  {
    id: "title_asc",
    label: "Title (A-Z)",
    value: { field: "title", order: "asc" },
  },
  {
    id: "release_desc",
    label: "Release Date (Newest)",
    value: { field: "release_date", order: "desc" },
  },
  {
    id: "rating_desc",
    label: "Rating (Highest)",
    value: { field: "vote_average", order: "desc" },
  },
];

function FilterControls({ onSortChange, onFilterChange }) {
  const [genres, setGenres] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [filters, setFilters] = useState({
    genres: [],
    minRating: 0,
    yearFrom: "",
    yearTo: "",
  });

  const sortRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setShowSortMenu(false);
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleSortChange = (option) => {
    setSelectedSort(option);
    setShowSortMenu(false);
    onSortChange(option.value);
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleGenreToggle = (genreId) => {
    const updatedGenres = filters.genres.includes(genreId)
      ? filters.genres.filter((id) => id !== genreId)
      : [...filters.genres, genreId];

    handleFilterChange({ genres: updatedGenres });
  };

  const resetFilters = () => {
    const resetValues = {
      genres: [],
      minRating: 0,
      yearFrom: "",
      yearTo: "",
    };
    setFilters(resetValues);
    onFilterChange(resetValues);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.genres.length > 0) count++;
    if (filters.minRating > 0) count++;
    if (filters.yearFrom || filters.yearTo) count++;
    return count;
  };

  return (
    <div className="filter-controls">
      <div className="control-group" ref={sortRef}>
        <button
          className={`control-button ${
            selectedSort.id !== sortOptions[0].id ? "active" : ""
          }`}
          onClick={() => setShowSortMenu(!showSortMenu)}
        >
          <FaSort />
          <span>Sort</span>
          {selectedSort.id !== sortOptions[0].id && (
            <span className="active-indicator"></span>
          )}
        </button>

        {showSortMenu && (
          <div className="dropdown-menu">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                className={`menu-item ${
                  selectedSort.id === option.id ? "active" : ""
                }`}
                onClick={() => handleSortChange(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="control-group" ref={filterRef}>
        <button
          className={`control-button ${
            getActiveFilterCount() > 0 ? "active" : ""
          }`}
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          <FaFilter />
          <span>Filter</span>
          {getActiveFilterCount() > 0 && (
            <span className="filter-count">{getActiveFilterCount()}</span>
          )}
        </button>

        {showFilterMenu && (
          <div className="dropdown-menu filter-menu">
            <div className="filter-header">
              <h4>Filters</h4>
              {getActiveFilterCount() > 0 && (
                <button className="reset-button" onClick={resetFilters}>
                  <FaTimes />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            <div className="filter-section">
              <h4>Genres</h4>
              <div className="genre-grid">
                {genres.map((genre) => (
                  <label key={genre.id} className="genre-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.genres.includes(genre.id)}
                      onChange={() => handleGenreToggle(genre.id)}
                    />
                    {genre.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Release Year</h4>
              <div className="year-range">
                <input
                  type="number"
                  placeholder="From"
                  value={filters.yearFrom}
                  onChange={(e) =>
                    handleFilterChange({ yearFrom: e.target.value })
                  }
                  min="1900"
                  max={new Date().getFullYear()}
                />
                <span>-</span>

                <input
                  type="number"
                  placeholder="To"
                  value={filters.yearTo}
                  onChange={(e) =>
                    handleFilterChange({ yearTo: e.target.value })
                  }
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="filter-section">
              <h4>Minimum Rating</h4>
              <div className="rating-slider">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) =>
                    handleFilterChange({ minRating: e.target.value })
                  }
                />
                <span className="rating-value">{filters.minRating}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterControls;
