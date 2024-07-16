import SearchBar from "../components/SearchBar";
import { useEffect, useState } from 'react';
import { fetchMoviesByQuery } from '../FetchMoviesAPI';
import MovieList from '../components/MovieList';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
    if (!query.trim()) return;
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        const results = await fetchMoviesByQuery(query);
        if (results.length === 0) {
          setError(true);
          return;
        } else {
          setMovies(results);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]
  );

    const handleSearch = async query => {
      setQuery(query);
    };
    console.log(movies);
    return (
        <main>
            <SearchBar onSearch={handleSearch} />
            {loading && <div>Loading...</div>}
            {error && <div>No movie found</div>}
            <MovieList movies={movies} />
        </main>
    )
};

export default MoviesPage;