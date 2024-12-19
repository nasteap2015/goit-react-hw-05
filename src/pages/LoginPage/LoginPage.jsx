import LoginForm from "../../components/LoginForm/LoginForm";
import { selectError } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import css from './LoginPage.module.css'

const LoginPage = () => {
    const error = useSelector(selectError);

    return (
        <div>
            <LoginForm />
            {error && (<p className={css.errorMessage}>Login error, please check and try again</p>)}
        </div>
    )
};

export default LoginPage;