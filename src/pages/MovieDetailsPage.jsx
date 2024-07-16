import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { fetchMovieDetails } from '../FetchMoviesAPI';
import { IoIosArrowRoundBack } from "react-icons/io";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movieDetails, setMovieDetails] = useState([]);
    const location = useLocation();
    const backLinkHref = location.state ?? '/movies';
    

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
        <main>
            <Link to={backLinkHref}>
                <IoIosArrowRoundBack size="24" />
                Go back
            </Link>
            {loading && <div>Loading...</div>}
            {error && <div>No movie details</div>}
            <div>
                <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
                <h1>{movieDetails.title}</h1>
                <p>User Score: {movieDetails.vote_average * 10}%</p>
                <h2>Overview</h2>
                <p>{movieDetails.overview}</p>
                <h2>Genres</h2>
                {/* <p>{movieDetails.genres.map((genre) => genre.name).join(" ")}</p> */}
            </div>
            <div>
                <p>Additional information</p>
                <ul>
                    <li>
                        <Link to="cast">Cast</Link>
                    </li>
                    <li>
                        <Link to="reviews">Reviews</Link>
                    </li>
                </ul>
            </div>

            <Suspense fallback={<div>Loading subpage...</div>}>
                <Outlet />
            </Suspense>
        </main>
    )
};

export default MovieDetailsPage;