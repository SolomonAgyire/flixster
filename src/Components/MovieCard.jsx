import React, { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import MovieModal from "./MovieModal";
import "./MovieCard.css";

function MovieCard({
  title,
  posterPath,
  voteAverage,
  movie,
  isFavorite,
  onToggleFavorite,
}) {
  const [showModal, setShowModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  let posterUrl;
  if (posterPath) {
    posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  } else {
    posterUrl = "https://via.placeholder.com/500x750?text=No+Poster+Available";
  }

  const handleClick = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
      );
      if (!response.ok) throw new Error("Failed to fetch movie details");
      const data = await response.json();
      setMovieDetails(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <>
      <div className="movie-card" onClick={handleClick}>
        <div className="movie-poster">
          <img src={posterUrl} alt={`${title} poster`} />
          <button
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <FaHeart />
          </button>
        </div>
        <div className="movie-info">
          <h3>{title}</h3>
          <p>
            <FaStar />
            {voteAverage.toFixed(1)}
          </p>
        </div>
      </div>

      {showModal && movieDetails && (
        <MovieModal movie={movieDetails} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default MovieCard;
