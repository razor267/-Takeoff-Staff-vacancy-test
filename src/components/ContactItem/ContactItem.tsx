import React, {memo, useState} from 'react'
import styles from './ContactItem.module.css'
import editLogo from '../../img/edit.svg'
import deleteLogo from '../../img/delete.svg'
import {ContactType} from '../../types/types'
import {useDispatch} from 'react-redux'
import {highLightText} from '../../utils/highLightText/highLightText'
import {actions} from '../../redux/actions'
import {FormAddEditContact} from '../FormAddEditContact/FormAddEditContact'
import {API} from '../../api/api'


type PropsType = {
    item: ContactType
    highLight: string
}
export const ContactItem: React.FC<PropsType> = memo(({item, highLight}) => {

    const dispatch = useDispatch()

    const [visibleEditForm, setVisibleEditForm] = useState(false)

    const {name, surname, company, address, number} = item

    const editContact = (id: number, contact: ContactType) => {
        dispatch(actions.editContact(id, contact))
        setVisibleEditForm(false)
    }

    const closeEditForm = () => {
        setVisibleEditForm(false)
    }

    const removeContact = () => {
        API.removeContact(item.id)
            .then(() => dispatch(actions.removeContact(item.id)))
            .catch(error => console.log(error))
    }


    //если форма редактирования контакта закрыта показать контакт, иначе форму редактированния
    return (
        <div>
            {!visibleEditForm ?
                <div className={styles.wrapper}>
                    <span>{highLight ? highLightText(highLight, surname) : surname}</span>
                    <span>{highLight ? highLightText(highLight, name) : name}</span>
                    <span>{highLight ? highLightText(highLight, company) : company}</span>
                    <span>{highLight ? highLightText(highLight, address) : address}</span>
                    <span>{highLight ? highLightText(highLight, number.toString()) : number}</span>
                    <span
                        title='Редактировать'
                        className={styles.edit}
                        onClick={() => setVisibleEditForm(true)}
                    >
                        <img src={editLogo} alt="edit"/>
                    </span>
                    <span
                        title='Удалить'
                        className={styles.delete}
                        onClick={removeContact}
                    >
                        <img src={deleteLogo} alt="delete"/>
                    </span>
                </div> :
                <FormAddEditContact
                    type='EditForm'
                    initialValues={{
                        id: item.id,
                        surname: item.surname,
                        name: item.name,
                        company: item.company,
                        address: item.address,
                        number: item.number,
                        userId: item.userId
                    }}
                    editContact={editContact}
                    closeEditForm={closeEditForm}
                    contact={item}
                />}
        </div>
    )
})