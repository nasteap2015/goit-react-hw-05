import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFavourites } from "../../redux/favourites/selectors";
import MovieList from '../../components/MovieList/MovieList';
import css from './Favourites.module.css';
import { fetchMovieDetails } from '../../FetchMoviesAPI';

const FavouritesPages = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const favsIds = useSelector(selectFavourites);

  useEffect(() => {
    favsIds.map((favsId) => {
      async function getMovieDetails() {
        try {
          if (!favsId) return;
          setError(false);
          setLoading(true);
          const dataMoviesDetails = await fetchMovieDetails(favsId);
          setMovies((prevMovies) => {
          if (prevMovies.some(movie => movie.id === dataMoviesDetails.id)) {
            return prevMovies;
          }
          return [...prevMovies, dataMoviesDetails];
        });
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
      getMovieDetails()
    }
    )
  }, [favsIds])

    return (
        <main className={css.section}>
            {loading && <div className={css.infoMessage}>Loading...</div>}
            {error && <div className={css.infoMessage}>No movie found</div>}
        {movies.length > 0 ? <MovieList movies={movies} /> : <p className={css.infoMessage}>No favourite movies</p>}
        </main>
    )
};

export default FavouritesPages;