import React, {memo} from 'react'
import {Field, Form, Formik} from 'formik'
import {API} from '../../api/api'
import {useNavigate} from 'react-router-dom'

export const Login: React.FC = memo(() => {

    const navigate = useNavigate()

    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            onSubmit={async (data) => {
                const res = await API.auth(data)
                if (res?.status === 200) {
                    navigate('/')
                }
            }}
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