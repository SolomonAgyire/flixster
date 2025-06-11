import React from "react";
import "./MovieCard.css";

function MovieCard({ title, posterPath, voteAverage }) {
  let posterUrl;
  if (posterPath) {
    posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  } else {
    posterUrl = "https://via.placeholder.com/500x750?text=No+Poster+Available";
  }

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={`${title} poster`} />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>
          <svg viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          {voteAverage.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
