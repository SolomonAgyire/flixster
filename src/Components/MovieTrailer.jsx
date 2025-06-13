import React from "react";
import "./MovieTrailer.css";

const MovieTrailer = ({ movie }) => {
  const noMovieTrailerFound = () => {
    return (
      <>
        <p className="animated-msg">
          <strong>No movie trailer found!</strong>
        </p>
        <img src="src/assets/placeholder.png" alt="No trailer available" />
      </>
    );
  };

  const movieTrailerFound = () => {
    return (
      <>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </>
    );
  };

  return (
    <div className="movie-trailer">
      {movie.trailerKey ? movieTrailerFound() : noMovieTrailerFound()}
    </div>
  );
};

export default MovieTrailer;
