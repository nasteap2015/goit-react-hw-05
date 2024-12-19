import css from './App.module.css';
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Navigation from '../Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { RestrictedRoute } from '../RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute';


const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const FavouritesPage = lazy(() => import('../../pages/FavouritesPage/Favourites'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage/RegistrationPage'));


function App() {
    const isRefreshing = useSelector(selectIsRefreshing);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return isRefreshing ? (
        <div>Refreshing user, please wait.</div>
    ) : 
    (
        <div>
            <Navigation/>
            <Suspense fallback={<div className={css.loading}>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<HomePage />} />;
                    <Route path='/movies' element={<MoviesPage />} />;
                        <Route path='/favourites' element={<PrivateRoute component={<FavouritesPage />} redirectTo={"/login"} />}/>;
                    <Route path="/login" element={<RestrictedRoute component={<LoginPage />} redirectTo={"/"} />} />
                    <Route path="/register" element={<RestrictedRoute component={<RegistrationPage />} redirectTo={"/"} />} />
                    <Route path='/movies/:movieId' element={<MovieDetailsPage />}>;
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Route>
                    <Route path='*' element={<NotFoundPage/>}/>;
                </Routes>
            </Suspense>
        </div>
    )

}

export default App
