import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../../FetchMoviesAPI';
import { useState, useEffect } from 'react';
import css from './HomePage.module.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
    }, []);

    return (
        <div className={css.homePageContainer}>
            <h1 className={css.homePageTitle}>Trending today:</h1>
            {loading && <div className={css.infoMessage}>Loading...</div>}
            {error && <div className={css.infoMessage}>No trending movies</div>}
            <MovieList movies={movies} />
        </div>
    )
};

export default HomePage;