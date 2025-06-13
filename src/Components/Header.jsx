import React from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import SearchBar from "./SearchBar";
import FilterControls from "./FilterControls";
import "./Header.css";
import logoImg from "../assets/img/logo.jpg";

const Header = ({
  activeView,
  onViewChange,
  onSearch,
  onSidebarToggle,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <div className="header__logo">
            <img
              src={logoImg}
              alt="Movie Magic Logo"
              className="header__logo-img"
            />
            <button
              className="header__menu-btn"
              onClick={onSidebarToggle}
              aria-label="Open sidebar"
            >
              <FaBars />
            </button>
          </div>
          <div className="header__filters">
            <FilterControls
              onSortChange={onSortChange}
              onFilterChange={onFilterChange}
            />
          </div>
        </div>

        <div className="header__center">
          <h1 className="header__title">Movies Playing</h1>
        </div>

        <div className="header__right">
          <div className="header__controls">
            <div className="header__view-toggle">
              <button
                className={`header__btn ${
                  activeView === "nowPlaying" ? "header__btn--active" : ""
                }`}
                onClick={() => onViewChange("nowPlaying")}
              >
                Now Playing
              </button>
              <button
                className={`header__btn ${
                  activeView === "search" ? "header__btn--active" : ""
                }`}
                onClick={() => onViewChange("search")}
              >
                Search
              </button>
            </div>

            {activeView === "search" && (
              <div className="header__search">
                <div className="header__search-bar">
                  <SearchBar onSearch={onSearch} />
                </div>
                <button
                  className="header__btn header__btn--cancel"
                  onClick={() => onViewChange("nowPlaying")}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
