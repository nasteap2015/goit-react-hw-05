import { Link } from "react-router-dom";
import css from './AuthNav.module.css';

const AuthNav = () => {
    return (
        <div className={css.authNavigation}>
            <Link to="/register" className={css.AuthNavLink}>Register</Link>
            <Link to="/login" className={css.AuthNavLink}>Login</Link>
        </div>
    )
};

export default AuthNav;