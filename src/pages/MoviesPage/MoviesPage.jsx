import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../FetchMoviesAPI';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";

    const handleSearch = async query => {
      setSearchParams({query: query});
    };

    useEffect(() => {
    if (!query.trim()) return;
    async function fetchMovies() {
      try {
        setMovies([]);
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

    return (
        <main className={css.section}>
            <SearchBar onSearch={handleSearch}/>
            {loading && <div>Loading...</div>}
            {error && <div>No movie found</div>}
            <MovieList movies={movies} />
        </main>
    )
};

export default MoviesPage;