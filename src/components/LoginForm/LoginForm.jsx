import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./LoginForm.module.css"
import { useDispatch } from "react-redux";
import { login } from '../../redux/auth/operations';

const initialValues = {
    name: '',
    email: '',
    password: '',
};

const LoginSchema = Yup.object().shape({
        email: Yup.string().email("Should be an email").required("Required"),
        password: Yup.string().min(7, "Too short").required("Required"),
    });

const LoginForm = () => {
    const emailFieldId = useId();
    const passwordFirldId = useId(); 
    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        dispatch(login(values));
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
            <Form>
                <div className={css.loginForm}>
                    <label htmlFor={emailFieldId}>Email</label>
                    <Field type="text" name="email" id={emailFieldId} className={css.input} />
                    <ErrorMessage name="email" component="span"/>
                    <label htmlFor={passwordFirldId}>Password</label>
                    <Field type="password" name="password" id={passwordFirldId} className={css.input}/>
                    <ErrorMessage name="password" component="span"/>
                    <button type="submit" className={css.button}>Log In</button>
                </div>
            </Form>
        </Formik>
    )

}

export default LoginForm;