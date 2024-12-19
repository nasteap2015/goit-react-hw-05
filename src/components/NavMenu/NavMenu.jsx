import css from "./NavMenu.module.css";
import clsx from 'clsx';
import { NavLink } from "react-router-dom";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const NavMenu = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={buildLinkClass}>
        Movies
      </NavLink>
      <NavLink to="/favourites" className={buildLinkClass}>
        Favourites
      </NavLink>
    </nav>
  );
};

export default NavMenu;
