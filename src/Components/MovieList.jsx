import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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
        
        if (data.page >= data.total_pages) {
            setHasMore(false);
        }

        if (pageNumber === 1) {
            setMovies(data.results);
        } else {
            setMovies(prevMovies => [...prevMovies, ...data.results]);
        }
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(1);
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMovies(nextPage);
    };

    if (error) {
        return <div className="movie-error">Error: {error}</div>;
    }

    return (
        <div className="movie-container">
        <div className="movie-list">
            {movies.map(movie => (
            <MovieCard
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
            />
            ))}
        </div>
        
        <div className="load-more-container">
            {loading && <div className="loading">Loading movies...</div>}
            {!loading && hasMore && (
            <button className="load-more-button" onClick={handleLoadMore}>
                Load More
            </button>
            )}
            {!loading && !hasMore && (
            <div className="no-more">No more movies to show</div>
            )}
        </div>
        </div>
    );
}

export default MovieList; 