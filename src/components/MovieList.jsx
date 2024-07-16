import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
    const location = useLocation();
     return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id} className={css.movieListItem}>
                    <Link to={`movies/${movie.id}`} state={location}>
                        {movie.original_title}
                    </Link>
                </li>
            ))
            }
        </ul>
    );
};

export default MovieList;