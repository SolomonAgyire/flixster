import React from "react";
import { FaStar } from "react-icons/fa";
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
          <FaStar />
          {voteAverage.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
