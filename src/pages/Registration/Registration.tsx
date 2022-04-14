import React, {memo} from 'react'
import {Field, Form, Formik} from 'formik'
import styles from '../Login/Login.module.css'
import {useNavigate} from 'react-router-dom'
import {usersAPI} from '../../api/usersAPI'

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

    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
                passwordReplay: ''
            }}
            onSubmit={(data) => registration(data)}
        >
            <Form className={styles.wrapper}>
                <div>
                    <label htmlFor="login">Логин:</label>
                    <Field id="login" name="login" placeholder="login" className={styles.input}/>
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <Field
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                        className={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="password">Повторите пароль:</label>
                    <Field
                        id="passwordReplay"
                        name="passwordReplay"
                        placeholder="password"
                        type="password"
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Зарегистрироваться</button>
                <button type="button" className={styles.button} onClick={() => navigate('/')}>Отменить регистрацию</button>
            </Form>
        </Formik>
    )
})