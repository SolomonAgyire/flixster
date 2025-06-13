import React from "react";
import { FaStar, FaTimes, FaClock, FaCalendarAlt } from "react-icons/fa";
import MovieTrailer from "./MovieTrailer";
import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const formatRuntime = (minutes) => {
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div
          className="modal-backdrop"
          style={{
            backgroundImage: backdropUrl ? `url(${backdropUrl})` : "none",
          }}
        >
          <div className="modal-backdrop-overlay" />
        </div>

        <div className="modal-details">
          <div className="modal-header">
            <h2>{movie.title}</h2>
            <div className="modal-rating">
              <FaStar />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          <div className="modal-meta">
            {movie.runtime && (
              <div className="meta-item">
                <FaClock />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            )}
            {movie.release_date && (
              <div className="meta-item">
                <FaCalendarAlt />
                <span>{formatDate(movie.release_date)}</span>
              </div>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="modal-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {movie.overview && (
            <div className="modal-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
          )}

          <MovieTrailer movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
