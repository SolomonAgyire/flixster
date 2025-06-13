import React from "react";
import "./Sidebar.css";
import { FaHeart, FaEye, FaTimes, FaHome } from "react-icons/fa";

const Sidebar = ({ open, onClose, onSelect }) => {
  return (
    <>
      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={onClose}
      />
      <aside className={`sidebar${open ? " open" : ""}`}>
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>
        <h3 className="sidebar-title">Quick Access</h3>
        <button
          className="sidebar-action-btn"
          onClick={() => {
            onSelect("nowPlaying");
            onClose();
          }}
        >
          <FaHome className="sidebar-action-icon" /> Home
        </button>
        <button
          className="sidebar-action-btn"
          onClick={() => {
            onSelect("favorites");
            onClose();
          }}
        >
          <FaHeart className="sidebar-action-icon" /> Favorites
        </button>
        <button
          className="sidebar-action-btn"
          onClick={() => {
            onSelect("watched");
            onClose();
          }}
        >
          <FaEye className="sidebar-action-icon" /> Watched
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
