import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { register } from '../../redux/auth/operations';
import { useDispatch } from "react-redux";


const initialValues = {
    name: '',
    email: '',
    password: '',
};

const LoginSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Should be an email").required("Required"),
        password: Yup.string().min(7, "Too short").required("Required"),
    });

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const emailFieldId = useId();
    const passwordFieldId = useId(); 
    const usernameFieldId = useId();

    const handleSubmit = (values, actions) => {
        dispatch(register(values));
        actions.resetForm();
    }

    return (
        <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            <Form>
                <div className={css.registerForm}>
                    <label htmlFor={usernameFieldId}>Username</label>
                    <Field type="text" name="name" id={usernameFieldId} className={css.input} />
                    <ErrorMessage name="name" component="span"/>
                    <label htmlFor={emailFieldId}>Email</label>
                    <Field type="email" name="email" id={emailFieldId} className={css.input} />
                    <ErrorMessage name="email" component="span"/>
                    <label htmlFor={passwordFieldId}>Password</label>
                    <Field type="password" name="password" id={passwordFieldId} className={css.input} />
                    <ErrorMessage name="password" component="span"/>
                    <button type="submit" className={css.button}>Register</button>
                </div>
            </Form>
        </Formik>
    )

}

export default RegistrationForm;