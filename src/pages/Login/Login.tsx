import React, {memo} from 'react'
import {Field, Form, Formik} from 'formik'
import {API} from '../../api/api'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/actions'

export const Login: React.FC = memo(() => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (data: {login: string, password: string}) => {
        const res = await API.auth(data)
        if (res?.status === 200) {
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('id', res.data.id)
            dispatch(actions.login(res.data.id))
            navigate('/')
        }
    }

    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            onSubmit={(data) => {login(data)}}
        >
            <Form>
                <label htmlFor="login">Логин</label>
                <Field id="login" name="login" placeholder="login"/>

                <label htmlFor="password">Пароль</label>
                <Field id="password" name="password" placeholder="password" type="password"/>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
})