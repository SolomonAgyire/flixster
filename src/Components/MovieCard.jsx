import React, { useState } from "react";
import { FaStar, FaHeart, FaEye } from "react-icons/fa";
import MovieModal from "./MovieModal";
import "./MovieCard.css";

function MovieCard({
  title,
  posterPath,
  voteAverage,
  movie,
  isFavorite,
  onToggleFavorite,
  isWatched,
  onToggleWatched,
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
      // Fetch movie details
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
      );
      if (!movieResponse.ok) throw new Error("Failed to fetch movie details");
      const movieData = await movieResponse.json();

      // Fetch movie videos (trailers)
      const videosResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
      );
      if (!videosResponse.ok) throw new Error("Failed to fetch movie videos");
      const videosData = await videosResponse.json();

      // Find the first official trailer
      const trailer = videosData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      // Combine movie details with trailer key
      const combinedData = {
        ...movieData,
        trailerKey: trailer ? trailer.key : null,
      };

      setMovieDetails(combinedData);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  const handleWatchedClick = (e) => {
    e.stopPropagation();
    onToggleWatched();
  };

  return (
    <>
      <div className="movie-card" onClick={handleClick}>
        <div className="movie-poster">
          <img src={posterUrl} alt={`${title} poster`} />
          <div className="movie-actions">
            <button
              className={`favorite-button ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <FaHeart />
            </button>
            <button
              className={`watched-button ${isWatched ? "active" : ""}`}
              onClick={handleWatchedClick}
              aria-label={isWatched ? "Mark as unwatched" : "Mark as watched"}
            >
              <FaEye />
            </button>
          </div>
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
