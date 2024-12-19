import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState, Suspense, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../../FetchMoviesAPI';
import { IoIosArrowRoundBack } from "react-icons/io";
import css from './MovieDetailsPage.module.css';
import { selectFavourites } from "../../redux/favourites/selectors";
import { markAsFavorite } from "../../redux/favourites/slice";
import { LuHeart } from "react-icons/lu";
import clsx from "clsx";


const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const location = useLocation();
    const backLinkHref = useRef(location.state ?? '/movies');
    const defaultImg = `https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster`;
    const [genres, setGenres] = useState([]);
    const favsId = useSelector(selectFavourites);
    const isFavourite = favsId.includes(movieId);


    useEffect(() => {
    async function getMovieDetails() {
      try {
        if (!movieId) return;
        setError(false);
        setLoading(true);
        const dataMoviesDetails = await fetchMovieDetails(movieId);
          setMovieDetails(dataMoviesDetails);
        setGenres(dataMoviesDetails.genres)
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieDetails();
    }, [movieId]);

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(markAsFavorite(movieId))
    };

    return (
        <main className={css.section}>
            <Link to={backLinkHref.current} className={css.backLink}>
                <IoIosArrowRoundBack size="24" />
                Go back
            </Link>
            {loading && <div className={css.infoMessage}>Loading...</div>}
            {error && <div className={css.infoMessage}>No movie details</div>}
            <div className={css.movieContainer}>
                <img src={
                    movieDetails.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                        : defaultImg}
                    alt={movieDetails.title} width="400px"
                    className={css.poster} />
                <div className={css.movieDetailsContainer}>
                    <div className={css.movieOverview}>
                        <div className={css.titleFavContainer}>
                            <h1>{movieDetails.title}</h1>
                        <button onClick={handleClick} className={css.favButton}>
                                <LuHeart className={clsx(isFavourite && css.favIconFavourite)} size={24} stroke="#141494" />
                        </button>
                        </div>
                        <p>User Score: {Math.floor(movieDetails.vote_average * 10)}%</p>
                        <h2>Overview</h2>
                        <p>{movieDetails.overview}</p>
                        <h2>Genres</h2>
                        <ul>
                            {genres.map((genre) => (
                                <li key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={css.linksContainer}>
                        <h3 className={css.additionalSectionTitle}>Additional information</h3>
                        <ul>
                            <li className={css.additionalSectionItem}>
                            <Link to="cast" className={css.movieDetailsLink}>Cast</Link>
                            </li>
                            <li className={css.additionalSectionItem}>
                            <Link to="reviews" className={css.movieDetailsLink}>Reviews</Link>
                            </li>
                        </ul>
                    </div>
                     
                    <Suspense fallback={<div>Loading subpage...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>  

            
        </main>
    )
};

export default MovieDetailsPage;