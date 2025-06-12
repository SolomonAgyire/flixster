import React from "react";
import { FaTimes } from "react-icons/fa";
import SearchBar from "./SearchBar";
import "./Header.css";

const Header = ({ activeView, onViewChange, onSearch }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Flixster</h1>
        <div className="header-controls">
          <div className="view-toggle">
            <button
              className={`toggle-button ${
                activeView === "nowPlaying" ? "active" : ""
              }`}
              onClick={() => onViewChange("nowPlaying")}
            >
              Now Playing
            </button>
            <button
              className={`toggle-button ${
                activeView === "search" ? "active" : ""
              }`}
              onClick={() => onViewChange("search")}
            >
              Search
            </button>
          </div>
          {activeView === "search" && (
            <div className="header-search-container">
              <div className="header-search">
                <SearchBar onSearch={onSearch} />
              </div>
              <button
                className="cancel-search-button"
                onClick={() => onViewChange("nowPlaying")}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
