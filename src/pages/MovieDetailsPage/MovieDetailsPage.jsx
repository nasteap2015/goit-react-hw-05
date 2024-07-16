import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { fetchMovieDetails } from '../../FetchMoviesAPI';
import { IoIosArrowRoundBack } from "react-icons/io";
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const location = useLocation();
    const backLinkHref = location.state ?? '/movies';
    const defaultImg = `https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster`

    useEffect(() => {
    async function getMovieDetails() {
      try {
        if (!movieId) return;
        setError(false);
        setLoading(true);
        const dataMoviesDetails = await fetchMovieDetails(movieId);
        setMovieDetails(dataMoviesDetails);
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
            <Link to={backLinkHref} className={css.backLink}>
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
                        {/* <p>{movieDetails.genres.map((genre) => genre.name).join(" ")}</p> */}
                    </div>
                    <p className={css.additionalSectionTitle}>Additional information</p>
                    <ul>
                        <li className={css.additionalSectionItem}>
                            <Link to="cast">Cast</Link>
                        </li>
                        <li className={css.additionalSectionItem}>
                            <Link to="reviews">Reviews</Link>
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