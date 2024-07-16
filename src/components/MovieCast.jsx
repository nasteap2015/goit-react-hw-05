import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../FetchMoviesAPI';

const MovieCast = () => {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movieCast, setMovieCast] = useState([]);
    const defaultImg = '<https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster>'

    useEffect(() => {
    async function getMovieCast() {
      try {
        if (!movieId) return;
        setError(false);
        setLoading(true);
        const dataMoviesCast = await fetchMovieCast(movieId);
        setMovieCast(dataMoviesCast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieCast();
    }, [movieId]);

    return (
        <section>
            {loading && <div>Loading...</div>}
            {error && <div>No movie details</div>}
            <ul>
            {movieCast.map((movie) => (
                <li key={movie.id}>
                    <img src={
                        movie.profile_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.profile_path}>`
                            : defaultImg}
                        alt={movie.name} width="100" />
                    <p>{movie.name}</p>
                    <p>Character: {movie.character}</p>
                </li>
            ))
            }
        </ul>
    );
        </section>
    )
};

export default MovieCast;