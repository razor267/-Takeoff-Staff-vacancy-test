import React, {memo} from 'react'
import cn from 'classnames'
import styles from '../ContactItem/ContactItem.module.css'
import {Field, Form, Formik} from 'formik'
import saveLogo from '../../img/save.svg'
import cancelLogo from '../../img/cancel.svg'
import {ContactType} from '../../types/types'

type PropsType = {
    closeAddForm?: () => void
    closeEditForm?: () => void
    addContact?: (contact: ContactType) => void
    editContact?: (id: number, contact: ContactType) => void
    type: 'AddForm' | 'EditForm'
    contact?: ContactType
    initialValues: ContactType
}
export const FormAddEditContact: React.FC<PropsType> = memo(({type, contact, addContact, closeAddForm, editContact, closeEditForm, initialValues}) => {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(data) => {
                if (addContact) addContact(data)
                if (editContact && contact) editContact(contact.id, data)
            }}
        >
            <Form className={cn(styles.wrapper, styles.wrapperActive)}>
                <Field id="surname" name="surname" placeholder="Фамилия" className={styles.input}/>
                <Field id="name" name="name" placeholder="Имя" className={styles.input}/>
                <Field id="company" name="company" placeholder="Компания" className={styles.input}/>
                <Field id="address" name="address" placeholder="Адрес" className={styles.input}/>
                <Field id="number" name="number" placeholder="Телефон" className={styles.input}/>
                <button type="submit" className={styles.buttonForm}>
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
        </Formik>
    )
})