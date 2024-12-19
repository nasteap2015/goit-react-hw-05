import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
    const location = useLocation();
    const defaultImg = `https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster`;


     return (
        <ul className={css.movieList}>
            {movies.map((movie) => (
                <li key={movie.id} className={css.movieListItem}>
                    <Link to={`/movies/${movie.id}`} state={location} className={css.movieLink}>
                        <img src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                : defaultImg}
                            alt={movie.title}
                            className={css.movieImg} />
                        <div className={css.movieInfo}>
                            <p className={css.movieTitle}>{movie.original_title}</p>
                            <p className={css.score}>User Score: {Math.floor(movie.vote_average * 10)}%</p>
                        </div>
                    </Link>
                </li>
            ))
            }
        </ul>
    );
};

export default MovieList;