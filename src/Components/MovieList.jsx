import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
        try {
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            setMovies(data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };
        fetchMovies();
    }, []);

    if (loading) {
        return <div>Loading movies...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
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
    );
}

export default MovieList; 