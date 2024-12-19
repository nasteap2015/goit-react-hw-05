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
      <div className={css.logoNavContainer}>
        <p className={css.hometitle}>MovieBox</p>
        <NavMenu />
      </div>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default Navigation;
