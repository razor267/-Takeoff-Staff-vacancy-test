import React, {memo} from 'react'
import cn from 'classnames'
import styles from '../ContactItem/ContactItem.module.css'
import {Field, Form, Formik} from 'formik'
import saveLogo from '../../img/save.svg'
import cancelLogo from '../../img/cancel.svg'
import {ContactType} from '../../types/types'
import * as yup from 'yup'

type PropsType = {
    closeAddForm?: () => void
    closeEditForm?: () => void
    addContact?: (contact: ContactType) => void
    editContact?: (contact: ContactType, id: number) => void
    type: 'AddForm' | 'EditForm'
    contact?: ContactType
    initialValues: ContactType
}
export const FormAddEditContact: React.FC<PropsType> = memo(({type, contact, addContact, closeAddForm, editContact, closeEditForm, initialValues}) => {

    const validationsSchema = yup.object({
        name: yup.string().required('Обязательное поле'),
        number: yup.string().min(5, 'Не менее 5 символов').required('Обязательное поле')
    })

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(data) => {
                if (addContact) addContact(data)
                if (editContact && contact) editContact(data, contact.id)
            }}
            validationSchema={validationsSchema}
        >
            {({
                  values, errors, touched, handleChange, handleBlur,
                  handleSubmit
              }) => (
                <Form className={cn(styles.wrapper, styles.wrapperActive)}>
                    <Field id="surname" name="surname" placeholder="Фамилия" className={styles.input}/>
                    <Field
                        id="name"
                        name="name"
                        placeholder="Имя"
                        className={cn(styles.input, {
                            [styles.errorInput]: touched.name && errors.name
                        })}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.name && errors.name && <div className={cn(styles.error, styles.errorName)}>{errors.name}</div>}
                    <Field id="company" name="company" placeholder="Компания" className={styles.input}/>
                    <Field id="address" name="address" placeholder="Адрес" className={styles.input}/>
                    <Field
                        id="number"
                        name="number"
                        type="number"
                        placeholder="Телефон"
                        className={cn(styles.input, {
                            [styles.errorInput]: touched.number && errors.number
                        })}
                        value={values.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.number && errors.number && <div className={cn(styles.error, styles.errorNumber)}>{errors.number}</div>}
                    <button type="submit" className={styles.buttonForm}  onClick={() => handleSubmit}>
                    <span title='Сохранить' className={styles.save}>
                        <img src={saveLogo} alt="save"/>
                    </span>
                    </button>
                    <span
                        title='Отмена'
                        className={styles.cancel}
                        onClick={type === 'AddForm' ? closeAddForm : type === 'EditForm' ? closeEditForm : undefined}
                    >
                    <img src={cancelLogo} alt="cancel"/>
                </span>
                </Form>
            )}
        </Formik>
    )
})