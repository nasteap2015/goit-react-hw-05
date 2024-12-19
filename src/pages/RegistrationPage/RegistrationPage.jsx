import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { selectError } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import css from './RegistrationPage.module.css'

const RegistrationPage = () => {
    const error = useSelector(selectError);

    return (
        <div>
            <RegistrationForm />
            {error && (<p className={css.errorMessage}>Registration failed, please try again</p>)}
        </div>
    )
};

export default RegistrationPage;