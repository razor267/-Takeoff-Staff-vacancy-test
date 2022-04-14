import React, {ChangeEvent, memo, useState} from 'react'
import {Field, Form, Formik} from 'formik'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/actions'
import styles from './Login.module.css'
import {usersAPI} from '../../api/usersAPI'

export const Login: React.FC = memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const login = async () => {
        const res = await usersAPI.auth({login: loginValue, password:passwordValue })
        if (res?.status === 200) {
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('id', res.data.id)
            dispatch(actions.login(res.data.id))
            navigate('/')
        }
    }

    const removeUser = async () => {
        const res = await usersAPI.auth({login: loginValue, password:passwordValue })
            if(res?.data.id) {
                await usersAPI.removeUser(res.data.id)
                setLoginValue('')
                setPasswordValue('')
            }
    }

    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            onSubmit={login}
        >
            <Form className={styles.wrapper}>
                <div>
                    <label htmlFor="login">Логин:</label>
                    <Field
                        id="login"
                        name="login"
                        placeholder="login"
                        className={styles.input}
                        value={loginValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>)=>setLoginValue(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label>
                    <Field
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                        className={styles.input}
                        value={passwordValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>)=>setPasswordValue(e.currentTarget.value)}
                    />
                </div>
                <button type="submit" className={styles.button}>Вход</button>
                <button type="button" className={styles.button} onClick={() => navigate('/reg')}>Регистрация</button>
                <button type="button" className={styles.button} onClick={()=>removeUser()}>
                    <span className={styles.delText}>Удалить аккаунт</span>
                </button>
            </Form>
        </Formik>
    )
})