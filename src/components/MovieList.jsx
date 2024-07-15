import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({movies}) => {
     return (
        <ul>
            {movies.map((movie) => (
                <li key={movie.id} className={css.movieListItem}>
                    <Link to={`${movie.id}`} state={location}>
                        {movie.original_title}
                    </Link>
                </li>
            ))
            }
        </ul>
    );
};

export default MovieList;