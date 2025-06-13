import React from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import SearchBar from "./SearchBar";
import "./Header.css";
import logoImg from "../assets/img/logo.jpg";

const Header = ({ activeView, onViewChange, onSearch, onSidebarToggle }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logoImg} alt="Movie Magic Logo" className="logo-img" />
          <button
            className="sidebar-toggle-btn"
            onClick={onSidebarToggle}
            aria-label="Open sidebar"
          >
            <FaBars />
          </button>
        </div>
        <div className="header-title">
          <span className="movies-playing-title">Movies Playing</span>
        </div>
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
