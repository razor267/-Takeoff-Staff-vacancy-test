import React, {memo} from 'react'
import {Field, Form, Formik} from 'formik'

export const Login:React.FC = memo(() => {
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form>
                <label htmlFor="login">Логин</label>
                <Field id="login" name="login" placeholder="login" />

                <label htmlFor="password">Пароль</label>
                <Field id="password" name="password" placeholder="password" type="password"/>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
})