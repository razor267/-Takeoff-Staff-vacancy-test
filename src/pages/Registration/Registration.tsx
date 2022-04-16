import React, {memo} from 'react'
import {Field, Form, Formik} from 'formik'
import styles from '../Login/Login.module.css'
import {useNavigate} from 'react-router-dom'
import {usersAPI} from '../../api/usersAPI'
import * as yup from 'yup'
import cn from 'classnames'

export const Registration: React.FC = memo(() => {

    const navigate = useNavigate()

    const registration = async (data: { login: string, password: string }) => {
        await usersAPI.getMaxUserId()
            .then(res => {
                usersAPI.addUser(data, res + 1)
                    .then(() => navigate('/login'))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    const validationsSchema = yup.object({
        login: yup.string().required('Обязательное поле'),
        password: yup.string().required('Обязательное поле'),
        passwordReplay: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательное поле')
    })

    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
                passwordReplay: ''
            }}
            onSubmit={(data) => registration(data)}
            validationSchema={validationsSchema}
        >
            {({
                  values, errors, touched, handleChange, handleBlur,
                  handleSubmit
              }) => (
                <Form className={styles.wrapper}>
                    <div className={styles.loginReg}>
                        <label htmlFor="login">Логин:</label>
                        <Field
                            id="login"
                            name="login"
                            placeholder="login"
                            className={cn(styles.input, {
                                [styles.errorInput]: touched.login && errors.login
                            })}
                            value={values.login}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.login && errors.login && <div className={styles.error}>{errors.login}</div>}
                    </div>
                    <div className={styles.passwordReg}>
                        <label htmlFor="password">Пароль:</label>
                        <Field
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                            className={cn(styles.input, {
                                [styles.errorInput]: touched.password && errors.password
                            })}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password && <div className={styles.error}>{errors.password}</div>}
                    </div>
                    <div className={styles.passwordReplyReg}>
                        <label htmlFor="password">Повторите пароль:</label>
                        <Field
                            id="passwordReplay"
                            name="passwordReplay"
                            placeholder="password"
                            type="password"
                            className={cn(styles.input, {
                                [styles.errorInput]: touched.passwordReplay && errors.passwordReplay
                            })}
                            value={values.passwordReplay}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.passwordReplay && errors.passwordReplay && <div className={styles.error}>{errors.passwordReplay}</div>}
                    </div>
                    <button type="submit" className={styles.button} onClick={() => handleSubmit}>Зарегистрироваться</button>
                    <button type="button" className={styles.button} onClick={() => navigate('/')}>Отменить регистрацию
                    </button>
                </Form>
            )}
        </Formik>
    )
})