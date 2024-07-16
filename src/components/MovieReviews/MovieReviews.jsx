import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReview } from '../../FetchMoviesAPI';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movieReviews, setMovieReviews] = useState([]);

    useEffect(() => {
    async function getMovieReview() {
      try {
        if (!movieId) return;
        setError(false);
        setLoading(true);
        const dataMovieReview = await fetchMovieReview(movieId);
        setMovieReviews(dataMovieReview);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieReview();
    }, [movieId]);

    return (
        <section>
            {loading && <div>Loading...</div>}
            {error && <div>No movie details</div>}
            <ul>
                {movieReviews.length > 0 ? (
                    movieReviews.map((movie) => (
                        <li key={movie.id} className={css.movieReview}>
                            <h3>Author: {movie.author}</h3>
                            <p>{movie.content}</p>
                        </li>
                    ))
                ) : (<li>
                    <p>We don't have any reviews for this movie</p>
                </li>)
            }
        </ul>
        </section>
    )
};

export default MovieReviews;