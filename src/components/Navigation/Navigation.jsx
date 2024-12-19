import clsx from 'clsx';
import css from './Navigation.module.css';
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import NavMenu from '../NavMenu/NavMenu';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.header}>
      <p className={css.hometitle}>MovieBox</p>
      <NavMenu />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default Navigation;
