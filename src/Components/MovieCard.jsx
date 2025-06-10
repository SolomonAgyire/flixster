import React from "react";
import "./MovieCard.css";

function MovieCard({ title, posterPath, voteAverage }) {
    let posterUrl;
    if (posterPath) {
        posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
        posterUrl = "https://via.placeholder.com/500x750?text=No+Image";
    }

    return (
        <div className="movie-card">
        <img src={posterUrl} alt={title} />
        <h3>{title}</h3>
        <p>⭐ {voteAverage}</p>
        </div>
    );
}

export default MovieCard; 