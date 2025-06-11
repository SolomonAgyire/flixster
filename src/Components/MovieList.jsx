import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeView, setActiveView] = useState("nowPlaying");
  const [searchQuery, setSearchQuery] = useState("");

  const filterMoviesWithPosters = (movieList) => {
    return movieList.filter((movie) => movie.poster_path !== null);
  };

  const fetchMovies = async (pageNumber) => {
    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pageNumber}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      const filteredMovies = filterMoviesWithPosters(data.results);

      if (data.page >= data.total_pages) {
        setHasMore(false);
      }

      if (pageNumber === 1) {
        setMovies(filteredMovies);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to search movies");
      }
      const data = await response.json();
      const filteredMovies = filterMoviesWithPosters(data.results);
      setMovies(filteredMovies);
      setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === "nowPlaying") {
      setPage(1);
      setHasMore(true);
      fetchMovies(1);
    } else if (searchQuery) {
      searchMovies(searchQuery);
    }
  }, [activeView]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveView("search");
    searchMovies(query);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  if (error) {
    return <div className="movie-error">Error: {error}</div>;
  }

  return (
    <div className="movie-container">
      <div className="view-toggle">
        <button
          className={`toggle-button ${
            activeView === "nowPlaying" ? "active" : ""
          }`}
          onClick={() => handleViewChange("nowPlaying")}
        >
          Now Playing
        </button>
        <button
          className={`toggle-button ${activeView === "search" ? "active" : ""}`}
          onClick={() => handleViewChange("search")}
        >
          Search
        </button>
      </div>

      {activeView === "search" && <SearchBar onSearch={handleSearch} />}

      {loading && <div className="loading">Loading movies...</div>}

      {!loading && movies.length === 0 && (
        <div className="no-results">No movies found</div>
      )}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            movie={movie}
          />
        ))}
      </div>

      {activeView === "nowPlaying" && !loading && (
        <div className="load-more-container">
          {hasMore ? (
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          ) : (
            <div className="no-more">No more movies to show</div>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieList;
