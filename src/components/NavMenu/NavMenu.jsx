import css from "./NavMenu.module.css";
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
    </nav>
  );
};

export default NavMenu;
