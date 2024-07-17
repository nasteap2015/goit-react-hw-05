import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState, Suspense, useRef } from 'react';
import { fetchMovieDetails } from '../../FetchMoviesAPI';
import { IoIosArrowRoundBack } from "react-icons/io";
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const location = useLocation();
    const backLinkHref = useRef(location.state ?? '/movies');
    const defaultImg = `https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster`;
    const [genres, setGenres] = useState([]);


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

    return (
        <main className={css.section}>
            <Link to={backLinkHref.current} className={css.backLink}>
                <IoIosArrowRoundBack size="24" />
                Go back
            </Link>
            {loading && <div>Loading...</div>}
            {error && <div>No movie details</div>}
            <div className={css.movieContainer}>
                <img src={
                    movieDetails.poster_path
                    ?`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                    : defaultImg}
                    alt={movieDetails.title} width="400px" />
                <div className={css.movieDetailsContainer}>
                    <div className={css.movieOverview}>
                        <h1>{movieDetails.title}</h1>
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
                    <p className={css.additionalSectionTitle}>Additional information</p>
                    <ul>
                        <li className={css.additionalSectionItem}>
                            <Link to="cast" className={css.movieDetailsLink}>Cast</Link>
                        </li>
                        <li className={css.additionalSectionItem}>
                            <Link to="reviews" className={css.movieDetailsLink}>Reviews</Link>
                        </li>
                    </ul> 
                    <Suspense fallback={<div>Loading subpage...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>  

            
        </main>
    )
};

export default MovieDetailsPage;