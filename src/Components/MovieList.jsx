import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import FilterControls from "./FilterControls";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeView, setActiveView] = useState("nowPlaying");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({
    field: "title",
    order: "asc",
  });
  const [filterConfig, setFilterConfig] = useState({
    genres: [],
    minRating: 0,
    yearFrom: "",
    yearTo: "",
  });

  const filterMoviesWithPosters = (movieList) => {
    return movieList.filter((movie) => movie.poster_path !== null);
  };

  const fetchMovies = async (pageNumber) => {
    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;

      // Add genre filter if selected
      if (filterConfig.genres.length > 0) {
        url += `&with_genres=${filterConfig.genres.join(",")}`;
      }

      // Add rating filter - TMDB uses vote_average for ratings
      if (filterConfig.minRating > 0) {
        url += `&vote_average.gte=${filterConfig.minRating}`;
      }

      // Add year filters
      if (filterConfig.yearFrom) {
        url += `&primary_release_date.gte=${filterConfig.yearFrom}-01-01`;
      }
      if (filterConfig.yearTo) {
        url += `&primary_release_date.lte=${filterConfig.yearTo}-12-31`;
      }

      console.log("Fetching movies with URL:", url); // For debugging

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      let filteredMovies = filterMoviesWithPosters(data.results);

      // Apply sorting
      filteredMovies = sortMovies(filteredMovies, sortConfig);

      if (data.page >= data.total_pages) {
        setHasMore(false);
      }

      if (pageNumber === 1) {
        setMovies(filteredMovies);
      } else {
        // Sort only the new movies before appending them
        const sortedNewMovies = sortMovies(filteredMovies, sortConfig);
        setMovies((prevMovies) => [...prevMovies, ...sortedNewMovies]);
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
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&sort_by=popularity.desc&with_text_query=${encodeURIComponent(
        query
      )}`;

      // Add filters to search
      if (filterConfig.genres.length > 0) {
        url += `&with_genres=${filterConfig.genres.join(",")}`;
      }
      if (filterConfig.minRating > 0) {
        url += `&vote_average.gte=${filterConfig.minRating}`;
      }
      if (filterConfig.yearFrom) {
        url += `&primary_release_date.gte=${filterConfig.yearFrom}-01-01`;
      }
      if (filterConfig.yearTo) {
        url += `&primary_release_date.lte=${filterConfig.yearTo}-12-31`;
      }

      console.log("Searching movies with URL:", url); // For debugging

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to search movies");
      }
      const data = await response.json();
      let filteredMovies = filterMoviesWithPosters(data.results);

      // Apply sorting
      filteredMovies = sortMovies(filteredMovies, sortConfig);

      setMovies(filteredMovies);
      setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sortMovies = (movieList, { field, order }) => {
    return [...movieList].sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];

      // Handle special cases
      if (field === "release_date") {
        valueA = new Date(valueA || "").getTime();
        valueB = new Date(valueB || "").getTime();
      }

      if (order === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  useEffect(() => {
    if (activeView === "nowPlaying") {
      setPage(1);
      setHasMore(true);
      fetchMovies(1);
    } else if (searchQuery) {
      searchMovies(searchQuery);
    }
  }, [activeView, sortConfig, filterConfig]);

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

  const handleSortChange = (sortValue) => {
    setSortConfig(sortValue);
  };

  const handleFilterChange = (filters) => {
    setFilterConfig(filters);
  };

  const handleToggleFavorite = (movieId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
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

      <div className="controls-container">
        {activeView === "search" && <SearchBar onSearch={handleSearch} />}
        <FilterControls
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      </div>

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
            isFavorite={favorites.has(movie.id)}
            onToggleFavorite={() => handleToggleFavorite(movie.id)}
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
