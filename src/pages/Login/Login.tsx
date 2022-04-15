import React, {ChangeEvent, memo, useState} from 'react'
import {Field, Form, Formik} from 'formik'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/actions'
import styles from './Login.module.css'
import {usersAPI} from '../../api/usersAPI'
import {UserType} from '../../types/types'
import * as yup from 'yup'
import cn from 'classnames'

export const Login: React.FC = memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isError, setIsError] = useState(false)
    const [isUserRemove, setIsUserRemove] = useState(false)
    const [removeUserId, setRemoveUserId] = useState(0)

    const login = async (user: UserType) => {
        const res = await usersAPI.auth(user)
        if (res.status === 200) {
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('id', res.data.id)
            dispatch(actions.login(res.data.id))
            navigate('/')
        } else {
            setIsError(true)
        }
    }

    const removeUser = async (user: UserType, resetForm: () => void) => {
        const res = await usersAPI.auth(user)
        if (res.status === 200) {
            setIsUserRemove(true)
            setRemoveUserId(res.data.id)
        } else {
            setIsError(true)
        }
    }

    const validationsSchema = yup.object({
        login: yup.string().required('Обязательное поле'),
        password: yup.string().required('Обязательное поле')
    })

    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            onSubmit={(values) => login(values)}
            validationSchema={validationsSchema}
        >
            {({
                  values, resetForm, errors, touched, handleChange, handleBlur,
                  handleSubmit
              }) => (
                <Form className={styles.wrapper}>
                    <div className={styles.login}>
                        <label htmlFor="login">Логин:</label>
                        <Field
                            id="login"
                            name="login"
                            placeholder="login"
                            className={cn(styles.input, {
                                [styles.errorInput]: touched.login && errors.login
                            })}
                            value={values.login}
                            onChange={(e: ChangeEvent) => {
                                handleChange(e)
                                setIsError(false)
                            }}
                            onBlur={handleBlur}
                        />
                        {touched.login && errors.login && <div className={styles.error}>{errors.login}</div>}
                    </div>
                    <div>
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
                            onChange={(e: ChangeEvent) => {
                                handleChange(e)
                                setIsError(false)
                            }}
                            onBlur={handleBlur}
                        />
                        {touched.password && errors.password && <div className={styles.error}>{errors.password}</div>}
                    </div>
                    {isError && <div className={styles.error}>Неверный логин/пароль</div>}
                    {!isUserRemove &&
                    <button type="submit" className={styles.button} onClick={() => handleSubmit}>Вход</button>}
                    {!isUserRemove &&
                    <button type="button" className={styles.button} onClick={() => navigate('/reg')}>Регистрация
                    </button>}
                    {!isUserRemove &&
                    <button type="button" className={styles.button} onClick={() => removeUser(values, resetForm)}>
                        <span className={styles.redText}>Удалить аккаунт</span>
                    </button>}
                    {isUserRemove &&
                    <div>Вы уверены что хотите удалить пользователя {values.login}?</div>}
                    {isUserRemove &&
                    <div>
                        <button type="button" className={styles.button} onClick={() => {
                            usersAPI.removeUser(removeUserId)
                                .then(() => {
                                    setIsUserRemove(false)
                                    resetForm()
                                })
                        }}>
                            <span className={styles.redText}>Удалить</span>
                        </button>
                        <button type="button" className={cn(styles.button, styles.cancelButton)} onClick={() => setIsUserRemove(false)}>
                            Отмена
                        </button>
                    </div>}
                </Form>
            )}
        </Formik>
    )
})